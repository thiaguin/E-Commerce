import { Injectable, HttpException } from '@nestjs/common'
import { Product } from './products.entity'
import {
    Raw,
    Between,
    MoreThanOrEqual,
    Equal,
    LessThanOrEqual,
    getConnection,
    getRepository,
    createQueryBuilder,
    LessThan,
    MoreThan,
    In,
} from 'typeorm'
import { CreateProductDto } from './dto/create-product.dto'
import { Order } from 'src/orders/orders.entity'

@Injectable()
export class ProductsService {
    private getRatingInterval(stars) {
        const result = {
            1: LessThanOrEqual(20),
            2: Between(20, 40),
            3: Between(40, 60),
            4: Between(60, 80),
            5: Between(80, 100),
        }
        return result[stars]
    }
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
                        result[key] = Raw((alias) => values.map((value) => this.getIlike(alias, value)).join(' and '))
                        break
                    case 'price':
                        const price = query[key]
                        result[key] = price.min && price.max ? Between(price.min, price.max) : this.getQueryPrice(price)
                        break
                    case 'rating':
                        const rating = this.getRatingInterval(query[key])
                        result[key] = rating
                        break
                    default:
                        result[key] = Array.isArray(query[key]) ? In(query[key]) : query[key]
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
        const skip = query.page * take || 0

        return { take, skip }
    }

    async findOne(params: { id: number }): Promise<Product> {
        const productRepository = getRepository(Product)
        const product = await productRepository.findOne({
            relations: ['brand', 'photos'],
            where: { id: params.id },
        })

        if (product) {
            return product
        }

        throw new HttpException('NotFound', 404)
    }

    async findAll(query): Promise<{ products: Product[]; count: number }> {
        const productRepository = getRepository(Product)
        const where = this.getQuery(query)
        const order = this.getOrder(query)

        console.log('qurey', where)
        const [products, count] = await productRepository.findAndCount({
            loadRelationIds: { relations: ['brand', 'photo', 'category', 'department'] },
            where: where,
            order: order,
            ...this.getPage(query),
        })

        return { products, count }
    }

    async create(body: CreateProductDto): Promise<Product> {
        const productRepository = getRepository(Product)
        const newProduct = productRepository.create(body)
        await productRepository.save(newProduct)
        return newProduct
    }

    async evaluate(params, body, user) {
        const productRepository = getRepository(Product)
        const qbOrder = createQueryBuilder(Order, 'order')

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

    async getMaxPrice(query): Promise<Product> {
        const productRepository = getRepository(Product)
        return await productRepository.findOne({
            order: { price: 'DESC' },
            select: ['price'],
            where: this.getQuery(query),
        })
    }
}
