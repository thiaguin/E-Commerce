import { Injectable, HttpException } from '@nestjs/common'
import { getManager, UpdateResult, FindManyOptions } from 'typeorm'
import { Department } from './departments.entity'
import { CreateDepartmentDTO } from './dto/create-departments.dto'
import { UpdateDepartmentDTO } from './dto/update-departments.dto'
import { Brand } from 'src/brands/brands.entity'
import { Product } from 'src/products/products.entity'

@Injectable()
export class DepartmentsService {
    async findAll(query): Promise<Department[]> {
        const departamentRepository = getManager().getRepository(Department)
        const findOptions: FindManyOptions<Department> = { order: { name: 'ASC' } }

        if (query.relations) findOptions.relations = ['categories']
        if (query.id) findOptions.where = { id: query.id }

        return await departamentRepository.find(findOptions)
    }

    async create(body: CreateDepartmentDTO): Promise<Department> {
        const departamentRepository = getManager().getRepository(Department)
        const newDepartment = departamentRepository.create(body)
        await departamentRepository.save(newDepartment)
        return newDepartment
    }

    async update(body: UpdateDepartmentDTO, params: { id: number }): Promise<UpdateResult> {
        const departamentRepository = getManager().getRepository(Department)
        const department = await departamentRepository.findOne({ where: { id: params.id } })

        if (department) {
            await departamentRepository.update({ id: params.id }, body)
            return
        }

        throw new HttpException('NotFound', 404)
    }

    async getBrands(params: { id: number }): Promise<Brand[]> {
        const product = getManager().createQueryBuilder(Product, 'p')
        return await product
            .select('DISTINCT b.id, b.name')
            .innerJoin(Brand, 'b', 'b.id = p.brand')
            .where(`p.department = ${params.id}`)
            .getRawMany()
    }
}
