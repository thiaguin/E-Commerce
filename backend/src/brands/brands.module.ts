import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common'
import { Brand } from './brands.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { BrandsService } from './brands.service'
import { BrandsController } from './brands.controller'
import { ModuleMetadata } from '@nestjs/common/interfaces'
import { AuthenticateMiddleware } from 'src/auth/auth.middleware'
import { Router } from 'express'

const metadata: ModuleMetadata = {
    imports: [TypeOrmModule.forFeature([Brand])],
    providers: [BrandsService],
    controllers: [BrandsController],
    exports: [],
}
@Module(metadata)
export class BrandsModule implements NestModule {
    public configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AuthenticateMiddleware)
            .forRoutes(
                { path: 'brands', method: RequestMethod.POST },
                { path: 'brands/:id', method: RequestMethod.PUT }
            )
    }
}
