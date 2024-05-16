#!/bin/bash

docker run -idt -p 3006:3306 --privileged=true -e TZ=Asia/Shanghai -e MYSQL_DATABASE=open-nuxt-blog -e MYSQL_ROOT_PASSWORD=JGhQ83axm5ydtQEnX8B3RgtqnFIY6U3+TO5VMMVyLxA= --name open-nuxt-blog mysql:8.0.20

# 检查目录是否存在
if [! -d "/usr/local/node-v18.20.2-linux-x64" ]; then
  # 解压 node.tar.gz 到 /usr/local/
  tar -xvf /tmp/node-v18.20.2-linux-x64.tar.gz -C /usr/local/
fi

export PATH=$PATH:/usr/local/node-v18.20.2-linux-x64/bin

npm i pnpm -g

pnpm config set registry https://registry.npmmirror.com/

pnpm install

pnpm dev