type Brand = {
    id: number
}
export class CreateProductDto {
    title: string
    description?: string
    technicalInformation?: string
    price: number
    rating?: number
    ratingQuantity?: number
    stockQuantity?: number
    saleQuantity?: number
    discount?: number
    brand: Brand
}
