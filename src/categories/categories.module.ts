import { Module } from '@nestjs/common'
import { ModuleMetadata, NestModule, MiddlewareConsumer } from '@nestjs/common/interfaces'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Category } from './categories.entity'
import { CategoriesService } from './categories.service'
import { CategoriesController } from './categories.controller'

const metadata: ModuleMetadata = {
    imports: [TypeOrmModule.forFeature([Category])],
    providers: [CategoriesService],
    controllers: [CategoriesController],
    exports: [],
}

@Module(metadata)
export class CategoriesModule implements NestModule {
    public configure(consumer: MiddlewareConsumer) {}
}
