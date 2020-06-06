import { Module } from '@nestjs/common'
import { OrdersService } from './orders.service'
import { ModuleMetadata } from '@nestjs/common/interfaces'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Order } from './orders.entity'
import { ProductOrder } from 'src/productOrder/productOrder.entity'
import { OrdersController } from './orders.controller'

const metadata: ModuleMetadata = {
    imports: [TypeOrmModule.forFeature([Order, ProductOrder])],
    providers: [OrdersService],
    controllers: [OrdersController],
    exports: [],
}

@Module(metadata)
export class OrdersModule {}
