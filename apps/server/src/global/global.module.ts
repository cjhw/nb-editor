import { getConfig } from '@editor/config'
import { Global, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { PostgreSqlModule } from './database/postgresql/postgresql.module'
import { RedisModule } from './database/redis/redis.module'

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      load: [getConfig],
      isGlobal: true,
    }),
    PostgreSqlModule,
    RedisModule,
  ],
})
export class GlobalModule {}
