import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { GlobalModule } from './global/global.module'
import { UserModule } from './modules/user/user.module'

const MODULES = [UserModule]

@Module({
  imports: [GlobalModule, ...MODULES],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
