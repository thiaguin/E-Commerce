import { Module } from '@nestjs/common'
import { ModuleMetadata } from '@nestjs/common/interfaces'
import { ProductsModule } from './products/products.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { BrandsModule } from './brands/brands.module'
import { DepartmentsModule } from './departments/departments.module'
import { CategoriesModule } from './categories/categories.module'
import { PhotosModule } from './photos/photos.module'

const metadata: ModuleMetadata = {
    imports: [TypeOrmModule.forRoot(), ProductsModule, BrandsModule, DepartmentsModule, CategoriesModule, PhotosModule],
    controllers: [],
    providers: [],
}

@Module(metadata)
export class AppModule {}
