import { NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const config = app.get(ConfigService)
  const port = config.get('server.port') || 5002
  await app.listen(port).then(() => {
    console.log(`server is running on port ${port}`)
  })
}
bootstrap()
