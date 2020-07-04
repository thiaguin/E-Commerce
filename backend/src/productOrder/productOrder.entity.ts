import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { Order } from 'src/orders/orders.entity'
import { Product } from 'src/products/products.entity'

@Entity()
export class ProductOrder {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    orderId: number

    @Column()
    productId: number

    @Column()
    productPrice: number

    @Column()
    productQuantity: number

    @Column({ default: 0 })
    evaluate: number

    @ManyToOne(() => Order, (order) => order.productOrder)
    order: Order

    @ManyToOne(() => Product, (product) => product.productOrder)
    product: Product
}
