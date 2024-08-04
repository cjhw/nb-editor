#! /bin/bash
# 该脚本只保留生产环境运行所需文件到统一目录
if [ ! -f './config/prod.yaml' ]; then
  echo "缺少 config/prod.yaml 文件，可参考 prod-sample.yaml 进行配置"
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
mkdir -p packages/config
mkdir -p packages/db
mkdir -p packages/schema
mkdir -p apps/client
mkdir -p apps/server
cd ../

# 复制文件
cp -v -L -r config ${outputDir}
cd ${outputDir}/config
rm -f dev.yaml
cd ../../
cp -v -L package.json ${outputDir}  
cp -v -L pnpm-lock.yaml ${outputDir}  
cp -v -L pnpm-workspace.yaml ${outputDir}
cp -v -L .npmrc ${outputDir}

# packages/config
cd packages/config
configOutput="../../${outputDir}/packages/config"
cp -v -L package.json ${configOutput}
cp -v -L -r lib ${configOutput}
cd ../../

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
cp -v -L dev-server.ts ${clientOutput}
cp -v -L prod-server.ts ${clientOutput}
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
pnpm install --prod --ignore-scripts
cd ../

echo "${outputDir} 打包完成"
