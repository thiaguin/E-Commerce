import { Injectable, HttpException } from '@nestjs/common'
import { getRepository, getManager } from 'typeorm'
import { Highlight } from './highlights.entity'
import { CreateHighlightDTO } from './dto/create-highlights.dto'
import { Photo } from 'src/photos/photos.entity'
import { Response } from 'express'
import * as path from 'path'

@Injectable()
export class HighlightsService {
    async findAll(query: { take: number }): Promise<Highlight[]> {
        const highlightRepository = getRepository(Highlight)
        return await highlightRepository.find({
            loadRelationIds: { relations: ['photo'] },
            order: { createdAt: 'DESC' },
            take: query.take || 5,
        })
    }

    async create(body: CreateHighlightDTO): Promise<Highlight> {
        const highlightRepository = getRepository(Highlight)
        const highlight = highlightRepository.create(body)
        await highlightRepository.save(highlight)
        return highlight
    }

    async setPhoto(body: { filename: string }, params: { id: number }): Promise<void> {
        const highlightRepository = getRepository(Highlight)
        const highlight = await highlightRepository.findOne({ where: { id: params.id } })

        highlight.filename = body.filename
        highlight.query = JSON.parse('{"department":4}')
        
        await highlightRepository.save(highlight)
    }

    async getPhoto(params: { id: number }, res: Response): Promise<void> {
        const highlightRepository = getRepository(Highlight)
        const highlight = await highlightRepository.findOne({ where: { id: params.id } })

        if (highlight) {
            return res.sendFile(path.resolve('..', 'backend', 'pictures', highlight.filename))
        }

        throw new HttpException('NotFound', 404)
    }
}
