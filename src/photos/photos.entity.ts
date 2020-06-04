import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'
import { IsDefined } from 'class-validator'

@Entity()
export class Photo {
    @PrimaryGeneratedColumn()
    id: number

    @Column('text')
    @IsDefined()
    path: string
}
