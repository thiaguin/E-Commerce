import { Controller, Post, Get, Put, Body, Param, HttpCode } from '@nestjs/common'
import { BrandsService } from './brands.service'
import { Brand } from './brands.entity'
import { CreateBrandDTO } from './dto/create-brands.dto'
import { UpdateBrandDTO } from './dto/update-brands.dto'
import { UpdateResult } from 'typeorm'

@Controller('brands')
export class BrandsController {
    private brandService: BrandsService

    constructor() {
        this.brandService = new BrandsService()
    }

    @Get()
    findAll(): Promise<Brand[]> {
        return this.brandService.findAll()
    }

    @Post()
    create(@Body() body: CreateBrandDTO): Promise<Brand> {
        return this.brandService.create(body)
    }

    @Put(':id')
    @HttpCode(204)
    update(@Body() body: UpdateBrandDTO, @Param() params: { id: number }): Promise<UpdateResult> {
        return this.brandService.update(body, params)
    }
}
