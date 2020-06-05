import { Injectable, HttpException } from '@nestjs/common'
import { Product } from './products.entity'
import { getManager, Repository } from 'typeorm'
import { CreateProductDto } from './dto/create-product.dto'

@Injectable()
export class ProductsService {
    async findOne(params: { id: number }): Promise<Product> {
        const productRepository = getManager().getRepository(Product)
        const product = await productRepository.findOne({
            relations: ['brand'],
            where: { id: params.id },
        })

        if (product) {
            return product
        }

        throw new HttpException('NotFound', 404)
    }

    async findAll(): Promise<Product[]> {
        const productRepository = getManager().getRepository(Product)
        return await productRepository.find({ loadRelationIds: { relations: ['brand'] } })
    }

    async create(body: CreateProductDto): Promise<Product> {
        const productRepository = getManager().getRepository(Product)
        const newProduct = productRepository.create(body)
        await productRepository.save(newProduct)
        return newProduct
    }
}
