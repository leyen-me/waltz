# Simple to use

```bash
# 第一次运行
# First run
mkdir -p /usr/local/blog/attachment
mkdir -p /usr/local/blog/mysql
docker run -itd -p 3000:3000 -p 3306:3306 --name blog difffffft/open-nuxt-blog:2.4
docker cp blog:/app/.output/public/attachment /usr/local/blog/attachment
docker cp blog:/var/lib/mysql /usr/local/blog/mysql
docker stop blog
docker rm -f blog

docker run \
-p 3000:3000 \
-p 3306:3306 \
--name blog \
-v /usr/local/blog/attachment:/app/.output/public/attachment \
-v /usr/local/blog/mysql:/var/lib/mysql \
-itd open-nuxt-blog:2.4


# 版本升级
# version upgrade
# 数据卷已存在
docker run \
-p 3000:3000 \
-p 3306:3306 \
--name blog \
-v /usr/local/blog/attachment:/app/.output/public/attachment \
-v /usr/local/blog/mysql:/var/lib/mysql \
-itd open-nuxt-blog:2.4
```

# Build

```bash
# 环境
# 1.网络
# 2.Node18+
# 3.Git

git clone https://github.com/difffffft/open-nuxt-blog.git

docker build -t open-nuxt-blog .

docker tag open-nuxt-blog:latest <your-docker-hub-username>/open-nuxt-blog:<your-version>

docker push <your-docker-hub-username>/open-nuxt-blog:<your-version>


# 本地运行/测试
# local
docker run -itd -p 3000:3000 -p 3306:3306 --name blog open-nuxt-blog
```