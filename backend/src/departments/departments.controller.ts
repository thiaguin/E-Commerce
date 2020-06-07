import { Controller, Post, Body, Get, Put, Param, HttpCode } from '@nestjs/common'
import { DepartmentsService } from './departments.service'
import { CreateDepartmentDTO } from './dto/create-departments.dto'
import { Department } from './departments.entity'
import { UpdateResult } from 'typeorm'

@Controller('departments')
export class DepartmentsController {
    private departamentService: DepartmentsService

    constructor() {
        this.departamentService = new DepartmentsService()
    }

    @Get()
    findAll(): Promise<Department[]> {
        return this.departamentService.findAll()
    }

    @Post()
    create(@Body() body: CreateDepartmentDTO): Promise<Department> {
        return this.departamentService.create(body)
    }

    @Put(':id')
    @HttpCode(204)
    update(@Body() body: CreateDepartmentDTO, @Param() params: { id: number }): Promise<UpdateResult> {
        return this.departamentService.update(body, params)
    }
}
