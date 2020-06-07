import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from 'typeorm'
import { Category } from 'src/categories/categories.entity'

@Entity()
export class Department {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @OneToMany(() => Category, (category) => category.department)
    categories: Category[]

    @CreateDateColumn({ type: 'timestamp with time zone' })
    createdAt: string

    @UpdateDateColumn({ type: 'timestamp with time zone' })
    updatedAt: number
}
