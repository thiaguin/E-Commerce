import { Controller, Post, Body, UseInterceptors, UploadedFile, Param } from '@nestjs/common'
import { PhotosService } from './photos.service'
import { FilesInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import * as path from 'path'
import { v4 as uuid } from 'uuid'
import { CreatePhotoDTO } from './dto/create-photos.dto'
import { ProductParamsDTO } from './dto/product-params.dto'
import { Photo } from './photos.entity'

@Controller('photos')
export class PhotosController {
    private photoService: PhotosService

    constructor() {
        this.photoService = new PhotosService()
    }

    @Post('upload/:productId')
    @UseInterceptors(
        FilesInterceptor('images', 15, {
            storage: diskStorage({
                destination: path.resolve('..', 'backend', 'pictures'),
                filename: (req, file, cb) => {
                    const uuidGenerate = uuid()
                    const newName = `${uuidGenerate}${path.extname(file.originalname)}`
                    const { body } = req
                    body.files = body.files ? [...body.files, newName] : newName
                    cb(null, newName)
                },
            }),
        })
    )
    async uploadPhoto(@Body() body: CreatePhotoDTO, @Param() params: ProductParamsDTO): Promise<Photo[]> {
        return this.photoService.uploadPhoto(body, params)
    }
}
