import { Inject, Injectable } from '@nestjs/common'
import type { RedisClientType } from 'redis'

@Injectable()
export class RedisService {
  @Inject('REDIS_CLIENT')
  private redisClient: RedisClientType

  async get(key: string) {
    return await this.redisClient.get(key)
  }

  async set(key: string, value: string | number, ttl?: number) {
    console.log(`Redis set ${key} ${value} ttl ${ttl}`)
    await this.redisClient.set(key, value)

    if (ttl) {
      await this.redisClient.expire(key, ttl)
    }
  }
}