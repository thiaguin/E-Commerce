import { Module, RequestMethod } from '@nestjs/common'
import { ModuleMetadata, NestModule, MiddlewareConsumer } from '@nestjs/common/interfaces'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Photo } from './photos.entity'
import { PhotosService } from './photos.service'
import { PhotosController } from './photos.controller'
import { MulterModule } from '@nestjs/platform-express'
import * as path from 'path'
import { AuthenticateMiddleware } from 'src/auth/auth.middleware'

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
    public configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AuthenticateMiddleware)
            .forRoutes({ path: 'photos/upload/:productId', method: RequestMethod.POST })
    }
}
