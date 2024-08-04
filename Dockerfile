FROM node:20-alpine3.19 as builder
COPY . /app/
WORKDIR /app
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.ustc.edu.cn/g' /etc/apk/repositories
RUN npm config set registry https://registry.npmmirror.com/
RUN npm i -g pm2 @nestjs/cli pnpm tsx
RUN apk --no-cache add bash dos2unix \
    && find . -name "*.sh" -exec dos2unix {} \; \
    && apk del dos2unix
RUN bash scripts/build.sh
RUN ls /app/output/apps/client

FROM node:20-alpine3.19 as prod
COPY --from=builder /app/docker/* /app/docker/
COPY --from=builder /app/output/ /app/
WORKDIR /app
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.ustc.edu.cn/g' /etc/apk/repositories
RUN npm config set registry https://registry.npmmirror.com/
RUN set -x \
    && apk update \
    && apk add --no-cache tzdata redis  \
    && chmod +x /app/docker/start.sh \
    && npm i -g pm2 @nestjs/cli pnpm tsx \
    && rm -rf /var/cache/apk/*

ENTRYPOINT sh /app/docker/start.sh
