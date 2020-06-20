import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function main() {
    const app = await NestFactory.create(AppModule)
    const port = process.env.PORT || 3000
    app.enableCors()
    await app.listen(port)
}

main()
