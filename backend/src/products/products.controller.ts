import { Controller, Get, Post, Body, Param, Query, Req } from '@nestjs/common'
import { ProductsService } from './products.service'
import { Product } from './products.entity'
import { CreateProductDto } from './dto/create-product.dto'

@Controller('products')
export class ProductsController {
    private readonly productService: ProductsService

    constructor() {
        this.productService = new ProductsService()
    }

    @Get('/maxPrice')
    getMaxPrice(@Query() query): Promise<Product> {
        return this.productService.getMaxPrice(query)
    }

    @Get('/:id')
    findOne(@Param() params: { id: number }): Promise<Product> {
        return this.productService.findOne(params)
    }

    @Get()
    findAll(@Query() query): Promise<{ products: Product[]; count: number }> {
        return this.productService.findAll(query)
    }

    @Post('/evaluate/:id')
    evaluate(@Param() params, @Body() body, @Req() req) {
        return this.productService.evaluate(params, body, req.user)
    }

    @Post()
    create(@Body() body: CreateProductDto): Promise<Product> {
        return this.productService.create(body)
    }
}
