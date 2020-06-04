import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common'
import { Product } from './products.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ProductsService } from './products.service'
import { ProductsController } from './products.controller'
import { ModuleMetadata } from '@nestjs/common/interfaces'

const metadata: ModuleMetadata = {
    imports: [TypeOrmModule.forFeature([Product])],
    providers: [ProductsService],
    controllers: [ProductsController],
    exports: [],
}
@Module(metadata)
export class ProductsModule implements NestModule {
    public configure(consumer: MiddlewareConsumer) {}
}
