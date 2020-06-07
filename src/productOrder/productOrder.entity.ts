import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { Order } from 'src/orders/orders.entity'
import { Product } from 'src/products/products.entity'

@Entity()
export class ProductOrder {
    @PrimaryGeneratedColumn()
    productOrderId: number

    @Column()
    orderId: number

    @Column()
    productId: number

    @Column()
    productPrice: number

    @Column()
    productQuantity: number

    @ManyToOne(() => Order, (order) => order.productOrder)
    order: Order

    @ManyToOne(() => Product, (product) => product.productOrder)
    product: Product
}
