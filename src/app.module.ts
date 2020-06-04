import { Module } from '@nestjs/common'
import { ProductsService } from './products/products.service'
import { ProductsController } from './products/products.controller'
import { ProductsModule } from './products/products.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ModuleMetadata } from '@nestjs/common/interfaces'

const metadata: ModuleMetadata = {
    imports: [TypeOrmModule.forRoot(), ProductsModule],
    controllers: [ProductsController],
    providers: [ProductsService],
}

@Module(metadata)
export class AppModule {}
