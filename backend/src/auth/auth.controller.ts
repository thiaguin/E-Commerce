import { Controller, Post, Body } from '@nestjs/common'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
    private authService: AuthService

    constructor() {
        this.authService = new AuthService()
    }

    @Post('login')
    login(@Body() body) {
        return this.authService.login(body)
    }
}
