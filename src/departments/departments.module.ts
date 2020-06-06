import { Module } from '@nestjs/common'
import { ModuleMetadata, NestModule, MiddlewareConsumer } from '@nestjs/common/interfaces'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Department } from './departments.entity'
import { DepartmentsService } from './departments.service'
import { DepartmentsController } from './departments.controller'

const metadata: ModuleMetadata = {
    imports: [TypeOrmModule.forFeature([Department])],
    providers: [DepartmentsService],
    controllers: [DepartmentsController],
    exports: [],
}

@Module(metadata)
export class DepartmentsModule implements NestModule {
    public configure(consumer: MiddlewareConsumer) {}
}
