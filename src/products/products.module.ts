import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common'
import { Product } from './products.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ProductsService } from './products.service'
import { ProductsController } from './products.controller'
import { ModuleMetadata } from '@nestjs/common/interfaces'
import { AuthenticateMiddleware } from 'src/auth/auth.middleware'

const metadata: ModuleMetadata = {
    imports: [TypeOrmModule.forFeature([Product])],
    providers: [ProductsService],
    controllers: [ProductsController],
    exports: [],
}

@Module(metadata)
export class ProductsModule implements NestModule {
    public configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AuthenticateMiddleware)
            .forRoutes(
                { path: 'products', method: RequestMethod.POST },
                { path: 'products/evaluate/:id', method: RequestMethod.POST }
            )
    }
}
