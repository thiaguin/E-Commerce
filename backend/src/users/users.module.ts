import { Module, RequestMethod, MiddlewareConsumer, NestModule } from '@nestjs/common'
import { UsersService } from './users.service'
import { ModuleMetadata } from '@nestjs/common/interfaces'
import { UsersController } from './users.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './users.entity'
import { AuthorizeMiddleware, AuthenticateMiddleware } from 'src/auth/auth.middleware'

const metadata: ModuleMetadata = {
    imports: [TypeOrmModule.forFeature([User])],
    providers: [UsersService],
    controllers: [UsersController],
    exports: [],
}

@Module(metadata)
export class UsersModule implements NestModule {
    public configure(consumer: MiddlewareConsumer) {}
}
