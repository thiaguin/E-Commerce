import { Controller, Post, Body, Get, Param, Req } from '@nestjs/common'
import { OrdersService } from './orders.service'
import { Order } from './orders.entity'
import { PayloadUserDTO } from 'src/users/dto/payload-user.dto'
import { User } from 'src/users/users.entity'

@Controller('orders')
export class OrdersController {
    private orderService: OrdersService

    constructor() {
        this.orderService = new OrdersService()
    }

    @Post()
    create(@Body() body): Promise<Order> {
        return this.orderService.create(body)
    }

    @Get()
    findAll(@Req() req): Promise<Order[]> {
        return this.orderService.findAll(req.user)
    }

    @Get(':id')
    findOne(@Param() params: { id: number }, @Req() req): Promise<Order> {
        return this.orderService.findOne(params, req.user)
    }
}
