import { Controller, Post, Body } from '@nestjs/common'
import { UsersService } from './users.service'
import { User } from './users.entity'
import { CreateUserDTO } from './dto/create-user.dto'

@Controller('users')
export class UsersController {
    private userService: UsersService

    constructor() {
        this.userService = new UsersService()
    }

    @Post()
    create(@Body() body: CreateUserDTO): Promise<User> {
        return this.userService.create(body)
    }
}
