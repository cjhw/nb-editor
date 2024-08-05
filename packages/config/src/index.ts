import path from 'node:path'
import yaml from 'js-yaml'
import fs from 'fs-extra'

const FILE_ENV_NAME = {
  development: 'dev',
  test: 'test',
  production: 'prod',
} as const

const env = (process.env.NODE_ENV || 'development') as keyof typeof FILE_ENV_NAME

export function getConfig() {
  const filePath = path.join(__dirname, '../../../config', `${FILE_ENV_NAME[env]}.yaml`)

  if (!fs.existsSync(filePath)) {
    throw new Error(`Can not find config file: ${filePath}`)
  }

  return yaml.load(fs.readFileSync(filePath, 'utf8')) as Record<string, unknown>
}
