import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
    JoinColumn,
    BeforeInsert,
    BeforeUpdate,
} from 'typeorm'
import { Photo } from '../photos/photos.entity'
import { Brand } from '../brands/brands.entity'
import { Category } from 'src/categories/categories.entity'
import { ProductOrder } from 'src/productOrder/productOrder.entity'

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    title: string

    @Column('text', { nullable: true })
    description: string

    @Column('json', { nullable: true })
    technicalInformation: JSON

    @Column('integer')
    price: number

    @Column('integer', { default: 0 })
    rating: number

    @Column('integer', { default: 0 })
    ratingQuantity: number

    @Column('integer', { default: 0 })
    stockQuantity: number

    @Column('boolean')
    hasStock: boolean

    @Column('integer', { default: 0 })
    saleQuantity: number

    @Column('integer', { default: 0 })
    discount: number

    @ManyToOne(() => Brand, (brand) => brand.id, { nullable: false, cascade: true })
    @JoinColumn()
    brand: Brand

    @ManyToOne(() => Category, (category) => category.id, { nullable: false })
    @JoinColumn()
    category: Category

    @OneToMany(() => ProductOrder, (productOrder) => productOrder.product)
    productOrder: ProductOrder[]

    @OneToMany(() => Photo, (photo) => photo.product)
    photos: Photo[]

    @ManyToOne(() => Photo, (photo) => photo.id, { nullable: true })
    photo: Photo

    @CreateDateColumn({ type: 'timestamp with time zone' })
    createdAt: string

    @UpdateDateColumn({ type: 'timestamp with time zone' })
    updatedAt: number

    @BeforeInsert()
    @BeforeUpdate()
    updateHasStock() {
        this.hasStock = this.stockQuantity > 0
    }
}