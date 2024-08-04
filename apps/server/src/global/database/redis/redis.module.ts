import { Global, Module } from '@nestjs/common'
import { createClient } from 'redis'
import { ConfigService } from '@nestjs/config'
import { RedisService } from './redis.service'

@Global()
@Module({
  providers: [
    RedisService,
    {
      provide: 'REDIS_CLIENT',
      async useFactory(configService: ConfigService) {
        const client = createClient({
          socket: {
            host: configService.get('db.redis.host'),
            port: configService.get('db.redis.port'),
          },
        })
        await client.connect()
        return client
      },
      inject: [ConfigService],
    },
  ],
  exports: [RedisService],
})
export class RedisModule {}
