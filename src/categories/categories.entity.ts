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
import { Department } from 'src/departments/departments.entity'

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    @IsDefined()
    name: string

    @ManyToOne(() => Department, (department) => department.id)
    @JoinColumn()
    department: Department

    @CreateDateColumn({ type: 'timestamp with time zone' })
    createdAt: string

    @UpdateDateColumn({ type: 'timestamp with time zone' })
    updatedAt: number
}
