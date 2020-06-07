import { Injectable, HttpException } from '@nestjs/common'
import { getManager, FindManyOptions } from 'typeorm'
import { Order } from './orders.entity'
import { Product } from 'src/products/products.entity'
import { CreateOrderDTO } from './dto/create-order.dto'
import { ProductOrder } from 'src/productOrder/productOrder.entity'
import { PayloadUserDTO } from 'src/users/dto/payload-user.dto'

@Injectable()
export class OrdersService {
    async findOne(params: { id: number }, user: PayloadUserDTO): Promise<Order> {
        const orderRepository = getManager().getRepository(Order)
        const where: { id: number; user?: number } = { id: params.id }

        if (user?.role !== 'ADMIN') where.user = user.id

        return await orderRepository.findOne({
            where: { id: params.id, user: user.id },
            relations: ['user', 'productOrder', 'productOrder.product'],
        })
    }

    async findAll(user: PayloadUserDTO): Promise<Order[]> {
        const orderRepository = getManager().getRepository(Order)
        const query: FindManyOptions<Order> = {
            loadRelationIds: { relations: ['user'] },
            order: { createdAt: 'DESC' },
        }

        if (user?.role !== 'ADMIN') query.where = { user: user.id }

        return await orderRepository.find()
    }

    async create(body: CreateOrderDTO): Promise<Order> {
        return await getManager().transaction(async (transactionManager) => {
            const { products, ...order } = body
            const newOrder = transactionManager.create(Order, order)

            await transactionManager.save(newOrder)

            let totalPrice = 0

            for (const currentProduct of products) {
                const product = await transactionManager.findOne(Product, { where: { id: currentProduct.id } })

                if (product.stockQuantity - currentProduct.quantity < 0) throw new HttpException('BadRequest', 400)

                const productOrder = transactionManager.create(ProductOrder, {
                    orderId: newOrder.id,
                    productId: product.id,
                    productPrice: product.price,
                    productQuantity: currentProduct.quantity,
                })

                totalPrice += product.price * currentProduct.quantity

                product.saleQuantity += currentProduct.quantity
                product.stockQuantity -= currentProduct.quantity

                await transactionManager.save(product)
                await transactionManager.save(productOrder)
            }

            newOrder.productsTotalPrice = totalPrice
            await transactionManager.save(newOrder)

            return newOrder
        })
    }
}
