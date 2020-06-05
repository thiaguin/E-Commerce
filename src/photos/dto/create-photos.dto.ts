type Photo = {
    filename: string
    originalName: string
}
export class CreatePhotoDTO {
    files: Photo[]
    main?: string
}
