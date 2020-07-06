import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { Order } from 'src/orders/orders.entity'
import { Product } from 'src/products/products.entity'
import { User } from 'src/users/users.entity'

@Entity()
export class Favorite {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    userId: number

    @Column()
    productId: number

    @ManyToOne(() => User, (user) => user.favorite)
    user: User

    @ManyToOne(() => Product, (product) => product.favorite)
    product: Product

    @CreateDateColumn({ type: 'timestamp with time zone' })
    createdAt: string

    @UpdateDateColumn({ type: 'timestamp with time zone' })
    updatedAt: number
}
