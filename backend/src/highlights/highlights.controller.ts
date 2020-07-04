import { Controller, Get, Req, Post, Body, UseInterceptors, Param, Res } from '@nestjs/common'
import { HighlightsService } from './highlights.service'
import { Highlight } from './highlights.entity'
import { CreateHighlightDTO } from './dto/create-highlights.dto'
import { FilesInterceptor, FileInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { Response } from 'express'
import { v4 as uuid } from 'uuid'
import * as path from 'path'

@Controller('highlights')
export class HighlightsController {
    private highlightService: HighlightsService

    constructor() {
        this.highlightService = new HighlightsService()
    }

    @Get()
    async findAll(@Req() req): Promise<Highlight[]> {
        return this.highlightService.findAll(req.query)
    }

    @Get('/photo/:id')
    async getPhoto(@Param() params: { id: number }, @Res() res: Response): Promise<void> {
        return this.highlightService.getPhoto(params, res)
    }

    @Post()
    async create(@Body() body: CreateHighlightDTO): Promise<Highlight> {
        return this.highlightService.create(body)
    }

    @Post('/upload/:id')
    @UseInterceptors(
        FileInterceptor('image', {
            storage: diskStorage({
                destination: path.resolve('..', 'backend', 'pictures'),
                filename: (req, file, cb) => {
                    const newName = uuid()
                    const extension = path.extname(file.originalname)
                    const filename = `${newName}${extension}`
                    const extesionsAllowed = ['.gif', '.jpg', '.jpeg', '.tiff', '.png']

                    req.body.filename = filename

                    if (extesionsAllowed.includes(extension)) {
                        cb(null, filename)
                    } else {
                        cb(new Error(), 'false')
                    }
                },
            }),
        })
    )
    async setPhoto(@Body() body, @Param() params): Promise<void> {
        return this.highlightService.setPhoto(body, params)
    }
}
