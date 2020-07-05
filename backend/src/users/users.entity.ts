import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    BeforeInsert,
    OneToMany,
} from 'typeorm'
import * as bcrypt from 'bcrypt'
import { Favorite } from 'src/favorites/favorites.entity'

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

    @OneToMany(() => Favorite, (favorite) => favorite.user)
    favorite?: Favorite[]

    @BeforeInsert()
    cryptPassword() {
        const salt = bcrypt.genSaltSync(+process.env.SIZE)
        this.password = bcrypt.hashSync(this.password, salt)
    }
}
