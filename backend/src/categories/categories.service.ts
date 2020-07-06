import { Injectable, HttpException } from '@nestjs/common'
import { getManager, UpdateResult } from 'typeorm'
import { Category } from './categories.entity'
import { Product } from '../products/products.entity'
import { Brand } from '../brands/brands.entity'
import { CreateCategoryDTO } from './dto/create-categories.dto'
import { UpdateCategoryDTO } from './dto/update-categories.dto'

@Injectable()
export class CategoriesService {
    async findAll(): Promise<Category[]> {
        const categoryRepository = getManager().getRepository(Category)
        return await categoryRepository.find()
    }

    async create(body: CreateCategoryDTO): Promise<Category> {
        const categoryRepository = getManager().getRepository(Category)
        const newCategory = categoryRepository.create(body)
        await categoryRepository.save(newCategory)
        return newCategory
    }

    async update(body: UpdateCategoryDTO, params: { id: number }): Promise<UpdateResult> {
        const categoryRepository = getManager().getRepository(Category)
        const category = await categoryRepository.findOne({ where: { id: params.id } })

        if (category) {
            await categoryRepository.update({ id: params.id }, body)
            return
        }

        throw new HttpException('NotFound', 404)
    }

    async getBrands(params: { id: number }): Promise<Brand[]> {
        const product = getManager().createQueryBuilder(Product, 'p')
        return await product
            .select('DISTINCT b.id, b.name')
            .innerJoin(Brand, 'b', 'b.id = p.brand')
            .where(`p.category = ${params.id}`)
            .getRawMany()
    }
}
