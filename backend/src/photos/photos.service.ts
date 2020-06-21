import { Injectable, HttpException } from '@nestjs/common'
import { getManager } from 'typeorm'
import { Photo } from './photos.entity'
import { ProductParamsDTO } from './dto/product-params.dto'
import { CreatePhotoDTO } from './dto/create-photos.dto'
import { Response } from 'express'
import * as path from 'path'
import { Product } from 'src/products/products.entity'
import { diskStorage } from 'multer'
import { v4 as uuid } from 'uuid'

@Injectable()
export class PhotosService {
    async create(body) {
        const photoRepository = getManager().getRepository(Photo)
        const newPhoto = photoRepository.create(body)
        await photoRepository.save(newPhoto)
        return newPhoto
    }

    async uploadPhoto(body: CreatePhotoDTO, params: ProductParamsDTO): Promise<Photo[]> {
        return await getManager().transaction(async (transactionManager) => {
            const photoRepository = getManager().getRepository(Photo)
            const productRepository = getManager().getRepository(Product)
            const promises = []

            let mainPhoto: Photo

            for (const file of body.files) {
                const { filename, originalName } = file
                const isMain = body.main ? body.main === originalName : false
                const newPhoto = photoRepository.create({ filename, product: params.productId })
                const promiseSave = transactionManager.save(newPhoto)

                if (isMain) mainPhoto = newPhoto

                promises.push(promiseSave)
            }

            const photos = await Promise.all(promises)

            if (mainPhoto) {
                const product = await productRepository.findOne({ where: { id: params.productId } })
                product.photo = mainPhoto
                await transactionManager.save(product)
            }

            return photos
        })
    }

    async getImagesData(params: ProductParamsDTO): Promise<Photo[]> {
        const photoRepository = getManager().getRepository(Photo)
        return await photoRepository.find({ where: { product: params.productId } })
    }

    async get(params: { id: number }, res: Response): Promise<void> {
        const photoRepository = getManager().getRepository(Photo)
        const photo = await photoRepository.findOne({ where: { id: params.id } })

        if (photo) {
            return res.sendFile(path.resolve('..', 'backend', 'pictures', photo.filename))
        }

        throw new HttpException('NotFound', 404)
    }
}
