import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm'
import { Photo } from 'src/photos/photos.entity'

@Entity()
export class Highlight {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ nullable: false })
    description: string

    @Column('json', { nullable: false })
    query: JSON

    @Column('text', { nullable: true })
    filename: string

    @CreateDateColumn({ type: 'timestamp with time zone' })
    createdAt: string

    @UpdateDateColumn({ type: 'timestamp with time zone' })
    updatedAt: number
}
