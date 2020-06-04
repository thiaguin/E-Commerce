import { Injectable } from '@nestjs/common'
import { Product } from './products.entity'
import { getManager, Repository } from 'typeorm'

@Injectable()
export class ProductsService {
    async findAll(): Promise<Product[]> {
        const productRepository = getManager().getRepository(Product)
        return await productRepository.find()
    }

    async create(body): Promise<Product[]> {
        const productRepository = getManager().getRepository(Product)
        const newProduct = productRepository.create(body)
        await productRepository.save(newProduct)
        return newProduct
    }
}
