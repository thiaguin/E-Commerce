import { Injectable } from '@nestjs/common'
import { getManager } from 'typeorm'
import { Photo } from './photos.entity'
import { Product } from 'src/products/products.entity'
import { ProductParamsDTO } from './dto/product-params.dto'
import { CreatePhotoDTO } from './dto/create-photos.dto'
import { Response } from 'express'
import * as path from 'path'

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
        console.log(body)
        for (const file of body.files) {
            const { filename, originalName } = file
            const isMain = body.main ? body.main === originalName : false
            const newPhoto = photoRepository.create({ filename, isMain, product: params.productId })
            const promiseSave = photoRepository.save(newPhoto)
            promises.push(promiseSave)
        }

        return await Promise.all(promises)
    }

    async getImagesData(params: ProductParamsDTO): Promise<Photo[]> {
        const photoRepository = getManager().getRepository(Photo)
        return await photoRepository.find({ where: { product: params.productId } })
    }

    async get(params: { id: number }, res: Response): Promise<void> {
        const photoRepository = getManager().getRepository(Photo)
        const photo = await photoRepository.findOne({ where: { id: params.id } })
        return res.sendFile(path.resolve('..', 'backend', 'pictures', photo.filename))
    }
}
