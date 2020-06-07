type User = {
    id: number
}

type Product = {
    id: number
    quantity: number
}
export class CreateOrderDTO {
    freight!: number
    delivery!: string
    deliveryData: JSON
    status!: string
    user!: User
    products: Product[]
}
