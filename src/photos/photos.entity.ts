import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm'
import { Product } from 'src/products/products.entity'

@Entity()
export class Photo {
    @PrimaryGeneratedColumn()
    id: number

    @Column('text')
    filename: string

    @ManyToOne(() => Product, (product) => product.id)
    @JoinColumn()
    product: Product

    @CreateDateColumn({ type: 'timestamp with time zone' })
    createdAt: string

    @UpdateDateColumn({ type: 'timestamp with time zone' })
    updatedAt: number
}
