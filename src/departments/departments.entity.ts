import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    JoinColumn,
} from 'typeorm'
import { IsDefined } from 'class-validator'
import { Category } from 'src/categories/categories.entity'

@Entity()
export class Department {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    @IsDefined()
    name: string

    @OneToMany(() => Category, (category) => category.department)
    categories: Category[]

    @CreateDateColumn({ type: 'timestamp with time zone' })
    createdAt: string

    @UpdateDateColumn({ type: 'timestamp with time zone' })
    updatedAt: number
}
