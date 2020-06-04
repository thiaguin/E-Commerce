import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { Photo } from '../photos/photos.entity'
import { IsDefined } from 'class-validator'

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    @IsDefined()
    title: string

    @Column('text', { nullable: true })
    description: string

    @Column('json', { nullable: true })
    technicalInformation: string

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

    //TODO: change to association
    @Column()
    brand: string

    @OneToMany((type) => Photo, (photo) => photo.id)
    photos: Photo[]

    @CreateDateColumn({ type: 'timestamp with time zone' })
    createdAt: string

    @UpdateDateColumn({ type: 'timestamp with time zone' })
    updatedAt: number
}
