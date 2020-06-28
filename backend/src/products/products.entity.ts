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
    getRepository,
} from 'typeorm'
import { Photo } from '../photos/photos.entity'
import { Brand } from '../brands/brands.entity'
import { Category } from 'src/categories/categories.entity'
import { ProductOrder } from 'src/productOrder/productOrder.entity'
import { Department } from 'src/departments/departments.entity'

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

    @Column({ nullable: true })
    filename: string

    @ManyToOne(() => Brand, (brand) => brand.id, { nullable: false, cascade: true })
    @JoinColumn()
    brand: Brand

    @ManyToOne(() => Category, (category) => category.id, { nullable: false })
    @JoinColumn()
    category: Category

    @ManyToOne(() => Department, (department) => department.id, { nullable: false })
    @JoinColumn()
    department: Department

    @OneToMany(() => ProductOrder, (productOrder) => productOrder.product)
    productOrder: ProductOrder[]

    @OneToMany(() => Photo, (photo) => photo.product)
    photos: Photo[]

    @CreateDateColumn({ type: 'timestamp with time zone' })
    createdAt: string

    @UpdateDateColumn({ type: 'timestamp with time zone' })
    updatedAt: number

    @BeforeInsert()
    @BeforeUpdate()
    updateHasStock() {
        this.hasStock = this.stockQuantity > 0
    }

    @BeforeInsert()
    @BeforeUpdate()
    async setDepartment() {
        if (this.category) {
            const category = await getRepository(Category).findOne({
                where: { id: this.category },
                loadRelationIds: { relations: ['department'] },
            })
            this.department = category.department
        }
    }
}
