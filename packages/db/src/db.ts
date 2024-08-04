import { getConfig } from '@editor/config'
import { schemas } from '@editor/schema'
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

const config = getConfig()

console.log('connection string: ', config.dbUrl)
const connection = postgres(config.dbUrl ?? '')

export const db = drizzle(connection, {
  schema: schemas,
})
