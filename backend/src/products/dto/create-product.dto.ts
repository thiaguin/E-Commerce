type Brand = {
    id: number
}

type Category = {
    id: number
}
export class CreateProductDto {
    title: string
    description?: string
    technicalInformation?: JSON
    price: number
    rating?: number
    ratingQuantity?: number
    stockQuantity?: number
    saleQuantity?: number
    discount?: number
    brand: Brand
    category: Category
}
