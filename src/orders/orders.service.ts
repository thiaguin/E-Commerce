import { Injectable } from '@nestjs/common'
import { getManager, TransactionManager } from 'typeorm'
import { Order } from './orders.entity'
import { Product } from 'src/products/products.entity'
import { CreateOrderDTO } from './dto/create-order.dto'
import { ProductOrder } from 'src/productOrder/productOrder.entity'

@Injectable()
export class OrdersService {
    async findOne(params: { id: number }): Promise<Order> {
        const orderRepository = getManager().getRepository(Order)
        return await orderRepository.findOne({
            where: { id: params.id },
            relations: ['user', 'productOrder', 'productOrder.product'],
        })
    }

    async findAll(): Promise<Order[]> {
        const orderRepository = getManager().getRepository(Order)
        return await orderRepository.find({ loadRelationIds: { relations: ['user'] } })
    }

    async create(body: CreateOrderDTO): Promise<Order> {
        return await getManager().transaction(async (transactionManager) => {
            const orderRepository = getManager().getRepository(Order)
            const productRepository = getManager().getRepository(Product)
            const productOrderRepository = getManager().getRepository(ProductOrder)
            const { products, ...order } = body
            const newOrder = orderRepository.create(order)
            const promises = []

            await transactionManager.save(newOrder)

            let totalPrice = 0

            for (const productId of products) {
                const product = await productRepository.findOne({ where: { id: productId } })
                const productOrder = productOrderRepository.create({
                    orderId: newOrder.id,
                    productId: product.id,
                    productPrice: product.price,
                })

                totalPrice += product.price
                promises.push(transactionManager.save(productOrder))
            }

            newOrder.productsTotalPrice = totalPrice

            await Promise.all(promises)
            await transactionManager.save(newOrder)

            return newOrder
        })
    }
}
