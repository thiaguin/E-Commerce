import { Brand } from 'src/brands/brands.entity'
import { Category } from 'src/categories/categories.entity'
import { Department } from 'src/departments/departments.entity'
import { ProductOrder } from 'src/productOrder/productOrder.entity'
import { Photo } from 'src/photos/photos.entity'
import { Favorite } from 'src/favorites/favorites.entity'

export class GetProductDTO {
    id: number
    title: string
    description: string
    technicalInformation: JSON
    price: number
    rating: number
    ratingQuantity: number
    stockQuantity: number
    hasStock: boolean
    saleQuantity: number
    discount: number
    filename: string
    brand: Brand
    category: Category
    department: Department
    productOrder: ProductOrder[]
    photos: Photo[]
    favorite?: Favorite[]
    isFavorite?: boolean
    createdAt: string
    updatedAt: number
}
