import { Module } from '@nestjs/common'
import { ModuleMetadata, NestModule, MiddlewareConsumer } from '@nestjs/common/interfaces'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Highlight } from './highlights.entity'
import { HighlightsService } from './highlights.service'
import { HighlightsController } from './highlights.controller'

const metadata: ModuleMetadata = {
    imports: [TypeOrmModule.forFeature([Highlight])],
    providers: [HighlightsService],
    controllers: [HighlightsController],
    exports: [],
}

@Module(metadata)
export class HighlightsModule implements NestModule {
    public configure(consumer: MiddlewareConsumer) {}
}
