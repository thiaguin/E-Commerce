import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common'
import { Product } from './products.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ProductsService } from './products.service'
import { ProductsController } from './products.controller'

@Module({
    imports: [TypeOrmModule.forFeature([Product])],
    providers: [ProductsService],
    controllers: [ProductsController],
    exports: [],
})
export class ProductsModule implements NestModule {
    public configure(consumer: MiddlewareConsumer) {}
}
