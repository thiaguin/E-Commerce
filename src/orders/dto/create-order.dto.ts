import { CreateProductOrderDTO } from 'src/productOrder/dto/create-productOrder.dto'
type User = {
    id: number
}
export class CreateOrderDTO {
    freight!: number
    delivery!: string
    deliveryData: JSON
    status!: string
    user!: User
    products: number[]
}
