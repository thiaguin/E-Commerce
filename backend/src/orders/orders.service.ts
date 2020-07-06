import { Injectable, HttpException } from '@nestjs/common'
import { getManager, FindManyOptions } from 'typeorm'
import { Order } from './orders.entity'
import { Product } from 'src/products/products.entity'
import { CreateOrderDTO } from './dto/create-order.dto'
import { ProductOrder } from 'src/productOrder/productOrder.entity'
import { PayloadUserDTO } from 'src/users/dto/payload-user.dto'
import { Console } from 'console'

@Injectable()
export class OrdersService {
    async findOne(params: { id: number }, user: PayloadUserDTO): Promise<Order> {
        const orderRepository = getManager().getRepository(Order)
        const where: { id: number; user?: number } = { id: params.id }

        if (user?.role !== 'ADMIN') where.user = user.id

        const order = await orderRepository.findOne({
            where: where,
            relations: ['user', 'productOrder', 'productOrder.product'],
        })

        if (order) {
            return order
        }

        throw new HttpException('NotFound', 404)
    }

    async findAll(user: PayloadUserDTO): Promise<Order[]> {
        const orderRepository = getManager().getRepository(Order)
        const query: FindManyOptions<Order> = {
            loadRelationIds: { relations: ['user'] },
            order: { createdAt: 'ASC' },
        }

        if (user?.role !== 'ADMIN') query.where = { user: user.id }

        return await orderRepository.find(query)
    }

    async create(body: CreateOrderDTO): Promise<Order> {
        return await getManager().transaction(async (transactionManager) => {
            const { products, ...order } = body
            const newOrder = transactionManager.create(Order, order)

            await transactionManager.save(newOrder)

            let totalPrice = 0

            for (const currentProduct of products) {
                const product = await transactionManager.findOne(Product, { where: { id: currentProduct.id } })

                if (!product) throw new HttpException('NotFound', 404)

                const productPrice = Math.round(product.price * ((100 - product.discount) / 100))

                if (product.stockQuantity - currentProduct.quantity < 0) throw new HttpException('BadRequest', 400)

                const productOrder = transactionManager.create(ProductOrder, {
                    orderId: newOrder.id,
                    productId: product.id,
                    productPrice: productPrice,
                    productQuantity: currentProduct.quantity,
                })

                totalPrice += productPrice * currentProduct.quantity

                product.saleQuantity += +currentProduct.quantity
                product.stockQuantity -= +currentProduct.quantity

                await transactionManager.save(product)
                await transactionManager.save(productOrder)
            }

            newOrder.productsTotalPrice = totalPrice
            await transactionManager.save(newOrder)

            return newOrder
        })
    }
}
