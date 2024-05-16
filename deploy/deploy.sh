#!/bin/bash

docker run -idt -p 3006:3306 --privileged=true -e TZ=Asia/Shanghai -e MYSQL_DATABASE=open-nuxt-blog -e MYSQL_ROOT_PASSWORD=JGhQ83axm5ydtQEnX8B3RgtqnFIY6U3+TO5VMMVyLxA= --name open-nuxt-blog mysql:8.0.20

# 检查目录是否存在
if [! -d "/usr/local/node-v18.20.2-linux-x64" ]; then
  # 解压 node.tar.gz 到 /usr/local/
  tar -xvf ./node-v18.20.2-linux-x64.tar.gz -C /usr/local/
fi

export PATH=$PATH:/usr/local/node-v18.20.2-linux-x64/bin

cd ..

npm i pnpm -g

pnpm config set registry https://registry.npmmirror.com/

pnpm install

pnpm dev




# 运行一个MYSQL
docker run -idt -p 3000:3000 -p 3306:3306 --privileged=true -e TZ=Asia/Shanghai -e MYSQL_DATABASE=open-nuxt-blog -e MYSQL_ROOT_PASSWORD=JGhQ83axm5ydtQEnX8B3RgtqnFIY6U3+TO5VMMVyLxA= --name open-nuxt-blog mysql:8.0.20
# 创建工作目录
mkdir app
# 上传打包后的文件夹
.output

mkdir app/env
# 上传node环境

cd app/env/node/
# 解压
tar -xvf ./node-v18.20.2-linux-x64.tar.gz -C /usr/local/


#############################run
# 环境
export PATH=$PATH:/usr/local/node-v18.20.2-linux-x64/bin
# 设置淘宝源
npm config set registry=https://registry.npmmirror.com/
npm install pm2 -g 

cd /app/.output/
pm2 start ecosystem.config.js
#############################




docker run -idt -p 3000:3000 -p 3306:3306 --privileged=true -e TZ=Asia/Shanghai -e MYSQL_DATABASE=open-nuxt-blog -e MYSQL_ROOT_PASSWORD=JGhQ83axm5ydtQEnX8B3RgtqnFIY6U3+TO5VMMVyLxA= --name open-nuxt-blog mysql:8.0.20
tar -xvf /app/open-nuxt-blog/deploy/node/node-v18.20.2-linux-x64.tar.gz -C /usr/local/
export PATH=$PATH:/usr/local/node-v18.20.2-linux-x64/bin
cd /app/open-nuxt-blog
npm i




export PATH=$PATH:/usr/local/node-v18.20.2-linux-x64/bin
cd /app/.output/
pm2 start ecosystem.config.js














=================>
tar -xvf /app/open-nuxt-blog/deploy/node/node-v18.20.2-linux-x64.tar.gz -C /usr/local/
export PATH=$PATH:/usr/local/node-v18.20.2-linux-x64/bin


cd /app/open-nuxt-blog
npm
npm run dev
