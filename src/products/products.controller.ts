import { Controller, Get, Post, Body, Param } from '@nestjs/common'
import { ProductsService } from './products.service'
import { Product } from './products.entity'
import { CreateProductDto } from './dto/create-product.dto'

@Controller('products')
export class ProductsController {
    private readonly productService: ProductsService

    constructor() {
        this.productService = new ProductsService()
    }

    @Get(':id')
    findOne(@Param() params: { id: number }): Promise<Product> {
        return this.productService.findOne(params)
    }

    @Get()
    findAll(): Promise<Product[]> {
        return this.productService.findAll()
    }

    @Post()
    create(@Body() body: CreateProductDto): Promise<Product> {
        return this.productService.create(body)
    }
}
