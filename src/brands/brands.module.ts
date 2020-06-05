import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common'
import { Brand } from './brands.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { BrandsService } from './brands.service'
import { BrandsController } from './brands.controller'
import { ModuleMetadata } from '@nestjs/common/interfaces'

const metadata: ModuleMetadata = {
    imports: [TypeOrmModule.forFeature([Brand])],
    providers: [BrandsService],
    controllers: [BrandsController],
    exports: [],
}

@Module(metadata)
export class BrandsModule implements NestModule {
    public configure(consumer: MiddlewareConsumer) {}
}
