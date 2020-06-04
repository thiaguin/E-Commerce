import { Module } from '@nestjs/common'
import { ProductsService } from './products/products.service'
import { ProductsController } from './products/products.controller'
import { ProductsModule } from './products/products.module'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
    imports: [TypeOrmModule.forRoot(), ProductsModule],
    controllers: [ProductsController],
    providers: [ProductsService],
})
export class AppModule {}
