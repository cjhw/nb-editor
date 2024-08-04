import * as cli from 'next/dist/cli/next-start'
import { getConfig } from '@editor/config'

const config = getConfig()
const port = Number(config.port) || 5001

try {
  cli.nextStart({
    port,
  })
  console.log(`[nb-editor] 客户端已启动，端口：${port}`)
}
catch (err: any) {
  console.log(`[nb-editor] 客户端启动失败！${err.message || err}`)
}
