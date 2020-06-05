import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm'
import { IsDefined } from 'class-validator'
import { Product } from 'src/products/products.entity'

@Entity()
export class Photo {
    @PrimaryGeneratedColumn()
    id: number

    @Column('text')
    @IsDefined()
    filename: string

    @ManyToOne(() => Product, (product) => product.id)
    @JoinColumn()
    product: Product

    @Column('boolean', { default: false })
    isMain: boolean

    @CreateDateColumn({ type: 'timestamp with time zone' })
    createdAt: string

    @UpdateDateColumn({ type: 'timestamp with time zone' })
    updatedAt: number
}
