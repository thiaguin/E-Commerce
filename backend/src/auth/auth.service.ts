import { Injectable, HttpException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { getManager } from 'typeorm'
import { User } from 'src/users/users.entity'
import * as bcrypt from 'bcrypt'
import { LoginUserDTO } from 'src/users/dto/login-user.dto'
import { ResultAuthDTO } from './dto/result-auth.dto'
import { IncomingHttpHeaders } from 'http'
import { PayloadUserDTO } from 'src/users/dto/payload-user.dto'

@Injectable()
export class AuthService {
    private jwtService: JwtService

    constructor() {
        this.jwtService = new JwtService({
            secret: process.env.SECRET,
            signOptions: { expiresIn: '24h' },
        })
    }

    async authorize(headers: IncomingHttpHeaders): Promise<PayloadUserDTO> {
        const token = headers.authorization

        if (token) {
            const { id, username, role } = this.jwtService.verify(token)
            const userRepository = getManager().getRepository(User)
            const user = await userRepository.findOne({ where: { id, username, role } })

            if (!user) throw new HttpException('Forbidden', 403)

            return { id, username, role }
        }

        throw new HttpException('Unauthorized', 401)
    }

    async login(body: LoginUserDTO): Promise<ResultAuthDTO> {
        const userRepository = getManager().getRepository(User)
        const user = await userRepository.findOne({
            where: { username: body.username },
            select: ['id', 'username', 'role', 'password'],
        })

        if (user) {
            if (bcrypt.compareSync(body.password, user.password)) {
                const { id, username, role } = user
                return { token: this.jwtService.sign({ id, username, role }) }
            }
        }

        throw new HttpException('NotFound', 404)
    }

    async getUser(headers: IncomingHttpHeaders): Promise<PayloadUserDTO> {
        const token = headers.authorization

        if (token) {
            const { id, username, role } = this.jwtService.verify(token)
            const userRepository = getManager().getRepository(User)
            const user = await userRepository.findOne({ where: { id, username, role } })

            if (user) return { id, username, role }
        }
    }
}
