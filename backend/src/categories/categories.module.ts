import { Module, RequestMethod } from '@nestjs/common'
import { ModuleMetadata, NestModule, MiddlewareConsumer } from '@nestjs/common/interfaces'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Category } from './categories.entity'
import { CategoriesService } from './categories.service'
import { CategoriesController } from './categories.controller'
import { AuthenticateMiddleware } from 'src/auth/auth.middleware'

const metadata: ModuleMetadata = {
    imports: [TypeOrmModule.forFeature([Category])],
    providers: [CategoriesService],
    controllers: [CategoriesController],
    exports: [],
}

@Module(metadata)
export class CategoriesModule implements NestModule {
    public configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AuthenticateMiddleware)
            .forRoutes(
                { path: 'categories', method: RequestMethod.POST },
                { path: 'categories/:id', method: RequestMethod.PUT }
            )
    }
}
