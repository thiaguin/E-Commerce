import { Injectable, HttpException } from '@nestjs/common'
import { Brand } from './brands.entity'
import { getManager, UpdateResult } from 'typeorm'
import { CreateBrandDTO } from './dto/create-brands.dto'
import { UpdateBrandDTO } from './dto/update-brands.dto'

@Injectable()
export class BrandsService {
    async findAll(): Promise<Brand[]> {
        const brandRepository = getManager().getRepository(Brand)
        return await brandRepository.find()
    }

    async create(body: CreateBrandDTO): Promise<Brand> {
        const brandRepository = getManager().getRepository(Brand)
        const newBrand = brandRepository.create(body)
        await brandRepository.save(newBrand)
        return newBrand
    }

    async update(body: UpdateBrandDTO, params: { id: number }): Promise<UpdateResult> {
        const brandRepository = getManager().getRepository(Brand)
        const brand = await brandRepository.findOne(params.id)

        if (brand) {
            await brandRepository.update({ id: params.id }, body)
            return
        }

        throw new HttpException('NotFound', 404)
    }
}
