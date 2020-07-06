import { Injectable, NestMiddleware, HttpException } from '@nestjs/common'
import { Response, Request } from 'express'
import { AuthService } from './auth.service'
import { PayloadUserDTO } from 'src/users/dto/payload-user.dto'

@Injectable()
export class AuthenticateMiddleware implements NestMiddleware {
    async use(req: Request, res: Response, next: () => void): Promise<void> {
        const authService = new AuthService()
        req.user = await authService.authorize(req.headers)
        next()
    }
}

@Injectable()
export class AuthorizeMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: () => void): void {
        const { role } = <PayloadUserDTO>req.user

        if (role === 'ADMIN') {
            throw new HttpException('Forbidden', 403)
        }

        next()
    }
}

@Injectable()
export class GetUserMiddleware implements NestMiddleware {
    async use(req: Request, res: Response, next: () => void): Promise<void> {
        const authService = new AuthService()
        req.user = await authService.getUser(req.headers)
        next()
    }
}
