import * as cli from 'next/dist/cli/next-dev'
import { getConfig } from '@editor/config'

const config = getConfig()
const port = Number(config.port) || 5001

try {
  cli.nextDev(
    {
      port,
    },
    'cli'
  )
  console.log(`[nb-editor] 客户端已启动，端口：${port}`)
} catch (err: any) {
  console.log(`[nb-editor] 客户端启动失败！${err.message || err}`)
}
