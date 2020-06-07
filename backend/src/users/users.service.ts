import { Injectable, HttpException } from '@nestjs/common'
import { getManager } from 'typeorm'
import { User } from './users.entity'
import { CreateUserDTO } from './dto/create-user.dto'

@Injectable()
export class UsersService {
    async create(body: CreateUserDTO): Promise<User> {
        const userRepository = getManager().getRepository(User)
        const user = await userRepository.findOne({ where: { username: body.username } })

        if (user) throw new HttpException('NotUnique', 409)

        const newUser = userRepository.create({ ...body, role: 'CLIENT' })
        await userRepository.save(newUser)
        return newUser
    }
}
