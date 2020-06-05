import { Module } from '@nestjs/common'
import { ModuleMetadata, NestModule, MiddlewareConsumer } from '@nestjs/common/interfaces'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Photo } from './photos.entity'
import { PhotosService } from './photos.service'
import { PhotosController } from './photos.controller'
import { MulterModule } from '@nestjs/platform-express'
import * as path from 'path'

const metadata: ModuleMetadata = {
    imports: [
        TypeOrmModule.forFeature([Photo]),
        MulterModule.register({ dest: path.resolve('..', 'backend', 'pictures') }),
    ],
    providers: [PhotosService],
    controllers: [PhotosController],
    exports: [],
}

@Module(metadata)
export class PhotosModule implements NestModule {
    public configure(consumer: MiddlewareConsumer) {}
}
