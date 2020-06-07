import { Module } from '@nestjs/common'
import { ModuleMetadata, MiddlewareConsumer, NestModule } from '@nestjs/common/interfaces'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from 'src/users/users.entity'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'

const metadata: ModuleMetadata = {
    imports: [TypeOrmModule.forFeature([User])],
    providers: [AuthService],
    controllers: [AuthController],
    exports: [],
}

@Module(metadata)
export class AuthModule implements NestModule {
    public configure(consumer: MiddlewareConsumer) {}
}
