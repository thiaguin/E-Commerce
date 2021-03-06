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
    getManager,
} from 'typeorm'
import { CreateProductDto } from './dto/create-product.dto'
import { Order } from 'src/orders/orders.entity'
import { ProductOrder } from 'src/productOrder/productOrder.entity'
import { Favorite } from 'src/favorites/favorites.entity'
import { User } from 'src/users/users.entity'
import { CreateFavoritesDTO } from 'src/favorites/dto/create-favorites.enity'
import { PayloadUserDTO } from 'src/users/dto/payload-user.dto'
import { Brand } from 'src/brands/brands.entity'
import { Photo } from 'src/photos/photos.entity'
import { GetProductDTO } from './dto/get-product.dto'
import { identity } from 'rxjs'

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

    async findOne(params: { id: number }, user): Promise<GetProductDTO> {
        const productRepository = getRepository(Product)
        const product = await productRepository.findOne({
            relations: ['brand', 'photos'],
            where: { id: params.id },
        })

        if (product) {
            const result = { ...product, isFavorite: false }

            if (user) {
                const favorite = await getRepository(Favorite).findOne({
                    where: { productId: product.id, userId: user.id },
                })

                result.isFavorite = !!favorite
            }

            return result
        }

        throw new HttpException('NotFound', 404)
    }

    async findAll(query): Promise<{ products: Product[]; count: number }> {
        const productRepository = getRepository(Product)
        const where = this.getQuery(query)
        const order = this.getOrder(query)

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
        return await getManager().transaction(async (transactionManager) => {
            const qbOrder = createQueryBuilder(Order, 'order')

            const productOrder = await transactionManager.findOne(ProductOrder, { where: { id: body.productOrderId } })
            const product = await transactionManager.findOne(Product, { where: { id: params.id } })
            const order = await qbOrder
                .where(`order.user = ${user.id}`)
                .leftJoin('order.productOrder', 'productOrder', `productOrder.productId = ${params.id}`)
                .getOne()

            if (order && product) {
                const { rating, ratingQuantity } = product
                const newRating = (rating * ratingQuantity + body.rating) / (ratingQuantity + 1)

                product.rating = Math.round(newRating)
                product.ratingQuantity += 1
                productOrder.evaluate = body.rating

                await transactionManager.save(Product, product)
                await transactionManager.save(ProductOrder, productOrder)

                return { rating: newRating, yours: body.rating }
            }

            const message = product ? 'BadRequest' : 'NotFound'
            const statusCode = product ? 400 : 404

            throw new HttpException(message, statusCode)
        })
    }

    async getMaxPrice(query): Promise<Product> {
        const productRepository = getRepository(Product)
        return await productRepository.findOne({
            order: { price: 'DESC' },
            select: ['price'],
            where: this.getQuery(query),
        })
    }

    async makeFavorite(params: { id: number }, user: PayloadUserDTO): Promise<Favorite> {
        const productRepository = getRepository(Product)
        const favoriteRepository = getRepository(Favorite)

        const product = await productRepository.findOne({ where: { id: params.id } })

        if (user) {
            const favorite = favoriteRepository.create({
                productId: product.id,
                userId: user.id,
            })

            await favoriteRepository.save(favorite)
            return favorite
        } else {
            throw new HttpException('NotFound', 404)
        }
    }

    async removeFavorite(params: { id: number }, user: PayloadUserDTO) {
        const favoriteRepository = getRepository(Favorite)

        if (params?.id && user?.id) {
            await favoriteRepository.delete({ productId: params.id, userId: user.id })
        }
    }

    async getFavorites(user: PayloadUserDTO): Promise<{ products: Product[]; count: number }> {
        const product = getRepository(Product).createQueryBuilder('p')
        const [products, count] = await product
            .select()
            .innerJoin('p.favorite', 'favorite')
            .loadRelationIdAndMap('brand', 'p.brand')
            .loadRelationIdAndMap('category', 'p.category')
            .loadRelationIdAndMap('department', 'p.department')
            .where(`favorite.userId = ${user.id}`)
            .getManyAndCount()

        return { products, count }
    }
}
