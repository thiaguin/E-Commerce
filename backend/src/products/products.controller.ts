import { Controller, Get, Post, Body, Param, Query, Req, Delete } from '@nestjs/common'
import { ProductsService } from './products.service'
import { Product } from './products.entity'
import { CreateProductDto } from './dto/create-product.dto'
import { GetProductDTO } from './dto/get-product.dto'

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

    @Get('/favorites')
    getFavorites(@Req() req): Promise<{ products: Product[]; count: number }> {
        return this.productService.getFavorites(req.user)
    }

    @Get('/:id')
    findOne(@Param() params: { id: number }, @Req() req): Promise<GetProductDTO> {
        return this.productService.findOne(params, req.user)
    }

    @Get()
    findAll(@Query() query): Promise<{ products: Product[]; count: number }> {
        return this.productService.findAll(query)
    }

    @Post('/evaluate/:id')
    evaluate(@Param() params, @Body() body, @Req() req) {
        return this.productService.evaluate(params, body, req.user)
    }

    @Post('/favorite/:id')
    makeFavorite(@Param() params, @Req() req) {
        return this.productService.makeFavorite(params, req.user)
    }

    @Delete('/favorite/:id')
    removeFavorite(@Param() params, @Req() req) {
        return this.productService.removeFavorite(params, req.user)
    }

    @Post()
    create(@Body() body: CreateProductDto): Promise<Product> {
        return this.productService.create(body)
    }
}
