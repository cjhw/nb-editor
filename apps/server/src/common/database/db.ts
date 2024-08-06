import { Logger } from '@nestjs/common'
import type { LogWriter } from 'drizzle-orm'
import { DefaultLogger } from 'drizzle-orm'
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { schemas } from '@editor/schema'

let connection: postgres.Sql

async function createConnection(config: Record<string, unknown> = {}) {
  return postgres(config.dbUrl ?? '')
}

export async function endDB() {
  if (connection) {
    await connection.end()
    connection = null
  }
}

export async function setupDB(config: Record<string, unknown> = {}) {
  if (connection) return

  const logger = new Logger('DB')

  class CustomDbLogWriter implements LogWriter {
    write(message: string) {
      logger.verbose(message)
    }
  }

  logger.debug(`Connecting to ${config.dbUrl}`)

  try {
    connection = await createConnection(config)
    logger.log('Connected to DB Successfully')
  } catch (error) {
    logger.error(error)
  }

  return drizzle(connection, {
    schema: schemas,
    logger: new DefaultLogger({ writer: new CustomDbLogWriter() }),
  })
}
