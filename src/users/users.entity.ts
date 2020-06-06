import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    BeforeInsert,
} from 'typeorm'
import * as bcrypt from 'bcrypt'

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    username: string

    @Column({ select: false })
    password: string

    @Column({ enum: ['CLIENT', 'ADMIN'], default: 'CLIENT' })
    role: string

    @CreateDateColumn({ type: 'timestamp with time zone' })
    createdAt: string

    @UpdateDateColumn({ type: 'timestamp with time zone' })
    updatedAt: string

    @BeforeInsert()
    cryptPassword() {
        const salt = bcrypt.genSaltSync(+process.env.SIZE)
        this.password = bcrypt.hashSync(this.password, salt)
    }
}
