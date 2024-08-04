import { Module } from '@nestjs/common'
import type { PostgresJsDatabase } from 'drizzle-orm/postgres-js'

import type { SchemaType } from '@editor/schema'
import { ConfigService } from '@nestjs/config'
import { setupDB } from '@/common/db'

export const DB = Symbol('DB_SERVICE')
export type DbType = PostgresJsDatabase<SchemaType>

@Module({
  providers: [
    {
      provide: DB,
      useFactory: async (configService: ConfigService) => {
        return await setupDB(configService.get('db.postgresql'))
      },
      inject: [ConfigService],
    },
  ],
})
export class PostgreSqlModule {}
