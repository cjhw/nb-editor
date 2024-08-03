#! /bin/bash
# 该脚本只保留生产环境运行所需文件到统一目录
if [ ! -f '.env.prod' ]; then
  echo "缺少 .env.prod 文件，可参考 .env.examples 进行配置"
  exit 1
fi

# 构建
pnpm fetch --prod
pnpm install
pnpm run build

outputDir="output"

# 新建输出目录
if [ -d ${outputDir} ]; then
  rm -rfv ${outputDir}
fi
mkdir -p ${outputDir}
cd ${outputDir}
mkdir -p packages
mkdir -p apps
mkdir -p packages/db
mkdir -p packages/schema
mkdir -p apps/client
mkdir -p apps/server
cd ../

# 复制文件
cp -v -L package.json ${outputDir}  
cp -v -L pnpm-lock.yaml ${outputDir}  
cp -v -L pnpm-workspace.yaml ${outputDir}
cp -v -L .npmrc ${outputDir}
cp -v -L .env ${outputDir}
cp -v -L .env.prod ${outputDir}     

# packages/schema
cd packages/schema
schemaOutput="../../${outputDir}/packages/schema"
cp -v -L package.json ${schemaOutput}
cp -v -L -r dist ${schemaOutput}
cd ../../

# packages/db
cd packages
dbOutput="../${outputDir}/packages"
cp -v -L package.json ${dbOutput}
cp -v -L -r db ${dbOutput}
cd ../

# apps/client
cd apps/client
clientOutput="../../${outputDir}/apps/client"
cp -v -L package.json ${clientOutput}
cp -v -L prod-server.js ${clientOutput}
cp -v -L -r public ${clientOutput}
cp -v -L -r .next ${clientOutput}
cd ../../

# apps/server
cd apps/server
serverOutput="../../${outputDir}/apps/server"
cp -v -L package.json ${serverOutput}
cp -v -L nest-cli.json ${serverOutput}
cp -v -L -r dist ${serverOutput}
cd ../../

# @see https://github.com/typicode/husky/issues/914#issuecomment-826768549
cd ${outputDir}
npm set-script prepare ""
pnpm install -r --offline --prod
cd ../

echo "${outputDir} 打包完成"
