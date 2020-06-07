import { Injectable, HttpException } from '@nestjs/common'
import { Product } from './products.entity'
import { getManager, Raw, Between, MoreThanOrEqual, Equal, LessThanOrEqual, getConnection } from 'typeorm'
import { CreateProductDto } from './dto/create-product.dto'
import { Order } from 'src/orders/orders.entity'

@Injectable()
export class ProductsService {
    private getQueryPrice(price) {
        if (price.min) return MoreThanOrEqual(price.min)
        if (price.max) return LessThanOrEqual(price.max)

        return Equal(price)
    }

    private getIlike(alias, value) {
        return `${alias} ILIKE '%${value}%'`
    }

    private getQuery(query) {
        const result = {}

        for (const key in query) {
            const productColumns = getConnection().getMetadata(Product).ownColumns
            const columnsName = productColumns.map((column) => column.propertyName)

            if (columnsName.includes(key)) {
                switch (key) {
                    case 'title':
                        const values = query[key].split(/\s+/)
                        result[key] = Raw((alias) => values.map((value) => this.getIlike(alias, value)).join(' or '))
                        break
                    case 'price':
                        const value = query[key]
                        result[key] = value.min && value.max ? Between(value.min, value.max) : this.getQueryPrice(value)
                        break
                    default:
                        result[key] = query[key]
                }
            }
        }

        return result
    }

    private getOrder(query) {
        const field = query.order?.field || 'createdAt'
        const direction = query.order?.direction || 'DESC'

        return { [field]: direction }
    }

    private getPage(query) {
        const take = query.take || 30
        const skip = query.skip * take || 0

        return { take, skip }
    }

    async findOne(params: { id: number }): Promise<Product> {
        const productRepository = getManager().getRepository(Product)
        const product = await productRepository.findOne({
            relations: ['brand'],
            where: { id: params.id },
        })

        if (product) {
            return product
        }

        throw new HttpException('NotFound', 404)
    }

    async findAll(query): Promise<{ products: Product[]; count: number }> {
        const productRepository = getManager().getRepository(Product)
        const where = this.getQuery(query)
        const order = this.getOrder(query)

        const [products, count] = await productRepository.findAndCount({
            loadRelationIds: { relations: ['brand', 'category'] },
            where: where,
            order: order,
            ...this.getPage(query),
        })

        return { products, count }
    }

    async create(body: CreateProductDto): Promise<Product> {
        const productRepository = getManager().getRepository(Product)
        const newProduct = productRepository.create(body)
        await productRepository.save(newProduct)
        return newProduct
    }

    async evaluate(params, body, user) {
        const productRepository = getManager().getRepository(Product)
        const qbOrder = getManager().createQueryBuilder(Order, 'order')

        const product = await productRepository.findOne({ where: { id: params.id } })
        const order = await qbOrder
            .where(`order.user = ${user.id}`)
            .leftJoin('order.productOrder', 'productOrder', `productOrder.productId = ${params.id}`)
            .getOne()

        if (order && product) {
            const { rating, ratingQuantity } = product
            const newRating = (rating * ratingQuantity + body.rating) / (ratingQuantity + 1)

            product.rating = Math.round(newRating)
            product.ratingQuantity += 1

            await productRepository.save(product)
            return { rating: newRating, yours: body.rating }
        }

        const message = product ? 'BadRequest' : 'NotFound'
        const statusCode = product ? 400 : 404

        throw new HttpException(message, statusCode)
    }
}
