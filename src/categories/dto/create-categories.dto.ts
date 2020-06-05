type Department = {
    id: number
}

export class CreateCategoryDTO {
    name: string
    department?: Department
}
