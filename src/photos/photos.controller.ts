import { Controller, Post, Body, UseInterceptors, Param, Get, Res, HttpException } from '@nestjs/common'
import { PhotosService } from './photos.service'
import { FilesInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import * as path from 'path'
import { v4 as uuid } from 'uuid'
import { CreatePhotoDTO } from './dto/create-photos.dto'
import { ProductParamsDTO } from './dto/product-params.dto'
import { Photo } from './photos.entity'
import { Response } from 'express'
import { throwError } from 'rxjs'
@Controller('photos')
export class PhotosController {
    private photoService: PhotosService

    constructor() {
        this.photoService = new PhotosService()
    }

    @Get('/:id')
    async get(@Param() params: { id: number }, @Res() res: Response): Promise<void> {
        return this.photoService.get(params, res)
    }

    @Get('/datas/:productId')
    async getImagesData(@Param() params: ProductParamsDTO) {
        return this.photoService.getImagesData(params)
    }

    @Post('upload/:productId')
    @UseInterceptors(
        FilesInterceptor('images', 15, {
            storage: diskStorage({
                destination: path.resolve('..', 'backend', 'pictures'),
                filename: (req, file, cb) => {
                    const newName = uuid()
                    const extension = path.extname(file.originalname)
                    const filename = `${newName}${extension}`
                    const { body } = req
                    const photo = { filename, originalName: file.originalname }
                    const extesionsAllowed = ['.gif', '.jpg', '.jpeg', '.tiff', '.png']

                    body.files = body.files ? [...body.files, photo] : [photo]

                    if (extesionsAllowed.includes(extension)) {
                        cb(null, filename)
                    } else {
                        cb(new Error(), 'false')
                    }
                },
            }),
        })
    )
    async uploadPhoto(@Body() body: CreatePhotoDTO, @Param() params: ProductParamsDTO): Promise<Photo[]> {
        return this.photoService.uploadPhoto(body, params)
    }
}
