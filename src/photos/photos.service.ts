import { Injectable } from '@nestjs/common'
import { getManager } from 'typeorm'
import { Photo } from './photos.entity'
import { Product } from 'src/products/products.entity'
import { ProductParamsDTO } from './dto/product-params.dto'
import { CreatePhotoDTO } from './dto/create-photos.dto'

@Injectable()
export class PhotosService {
    async create(body) {
        const photoRepository = getManager().getRepository(Photo)
        const newPhoto = photoRepository.create(body)
        await photoRepository.save(newPhoto)
        return newPhoto
    }

    async uploadPhoto(body: CreatePhotoDTO, params: ProductParamsDTO): Promise<Photo[]> {
        const photoRepository = getManager().getRepository(Photo)
        const promises = []

        for (const filename of body.files) {
            const newPhoto = photoRepository.create({ filename, product: params.productId })
            const promiseSave = photoRepository.save(newPhoto)
            promises.push(promiseSave)
        }

        return await Promise.all(promises)
    }
}
