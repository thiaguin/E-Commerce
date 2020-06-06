import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
    JoinColumn,
} from 'typeorm'
import { Photo } from '../photos/photos.entity'
import { Brand } from '../brands/brands.entity'
import { IsDefined } from 'class-validator'
import { Category } from 'src/categories/categories.entity'

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    @IsDefined()
    title: string

    @Column('text', { nullable: true })
    description: string

    @Column('json', { nullable: true })
    technicalInformation: JSON

    @Column('integer')
    @IsDefined()
    price: number

    @Column('integer', { default: 0 })
    rating: number

    @Column('integer', { default: 0 })
    ratingQuantity: number

    @Column('integer', { default: 0 })
    stockQuantity: number

    @Column('integer', { default: 0 })
    saleQuantity: number

    @Column('integer', { default: 0 })
    discount: number

    @ManyToOne(() => Brand, (brand) => brand.id, { nullable: false })
    @JoinColumn()
    brand: Brand

    @ManyToOne(() => Category, (category) => category.id, { nullable: false })
    @JoinColumn()
    category: Category

    @OneToMany(() => Photo, (photo) => photo.product)
    photos: Photo[]

    @CreateDateColumn({ type: 'timestamp with time zone' })
    createdAt: string

    @UpdateDateColumn({ type: 'timestamp with time zone' })
    updatedAt: number
}
