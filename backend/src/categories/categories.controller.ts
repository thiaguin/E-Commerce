import { Controller, Post, Body, Get, Put, Param, HttpCode } from '@nestjs/common'
import { CategoriesService } from './categories.service'
import { CreateCategoryDTO } from './dto/create-categories.dto'
import { Category } from './categories.entity'
import { UpdateResult } from 'typeorm'
import { Brand } from '../brands/brands.entity'

@Controller('categories')
export class CategoriesController {
    private categoryService: CategoriesService

    constructor() {
        this.categoryService = new CategoriesService()
    }

    @Get()
    findAll(): Promise<Category[]> {
        return this.categoryService.findAll()
    }

    @Get('/brands/:id')
    getBrands(@Param() params): Promise<Brand[]> {
        return this.categoryService.getBrands(params)
    }

    @Post()
    create(@Body() body: CreateCategoryDTO): Promise<Category> {
        return this.categoryService.create(body)
    }

    @Put(':id')
    @HttpCode(204)
    update(@Body() body: CreateCategoryDTO, @Param() params: { id: number }): Promise<UpdateResult> {
        return this.categoryService.update(body, params)
    }
}
