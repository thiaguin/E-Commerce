import { Module, RequestMethod } from '@nestjs/common'
import { OrdersService } from './orders.service'
import { ModuleMetadata, MiddlewareConsumer, NestModule } from '@nestjs/common/interfaces'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Order } from './orders.entity'
import { ProductOrder } from 'src/productOrder/productOrder.entity'
import { OrdersController } from './orders.controller'
import { AuthenticateMiddleware } from 'src/auth/auth.middleware'

const metadata: ModuleMetadata = {
    imports: [TypeOrmModule.forFeature([Order, ProductOrder])],
    providers: [OrdersService],
    controllers: [OrdersController],
    exports: [],
}

@Module(metadata)
export class OrdersModule implements NestModule {
    public configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AuthenticateMiddleware)
            .forRoutes(
                { path: 'orders', method: RequestMethod.POST },
                { path: 'orders', method: RequestMethod.GET },
                { path: 'orders/:id', method: RequestMethod.GET }
            )
    }
}
