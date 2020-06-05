import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { IsDefined } from 'class-validator'

@Entity()
export class Brand {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    @IsDefined()
    name: string

    @CreateDateColumn({ type: 'timestamp with time zone' })
    createdAt: string

    @UpdateDateColumn({ type: 'timestamp with time zone' })
    updatedAt: number
}
