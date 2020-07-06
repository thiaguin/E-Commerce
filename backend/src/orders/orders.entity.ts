import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    ManyToOne,
    JoinColumn,
} from 'typeorm'
import { User } from 'src/users/users.entity'
import { ProductOrder } from 'src/productOrder/productOrder.entity'

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number

    @Column('int', { default: 0 })
    productsTotalPrice: number

    @Column('int', { nullable: false })
    freight: number

    @Column({ nullable: false })
    delivery: string

    @Column('json')
    deliveryData: JSON

    @ManyToOne(() => User, (user) => user.id, { nullable: false })
    @JoinColumn()
    user: User

    @OneToMany(() => ProductOrder, (productOrder) => productOrder.order)
    productOrder?: ProductOrder[]

    @CreateDateColumn({ type: 'timestamp with time zone' })
    createdAt: string

    @UpdateDateColumn({ type: 'timestamp with time zone' })
    updatedAt: number
}
