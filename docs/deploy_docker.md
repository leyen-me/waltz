### Simple to use

```bash
# 第一次运行
# First run
mkdir -p /usr/local/blog/attachment
mkdir -p /usr/local/blog/mysql
docker run -itd -p 3000:3000 -p 3306:3306 --name blog difffffft/open-nuxt-blog:<version>
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
-itd open-nuxt-blog:<version>


# 版本升级
# 前提条件: 数据库结构和数据未发生变化, 仅API层面发生变化
# version upgrade
# 数据卷已存在
docker run \
-p 3000:3000 \
-p 3306:3306 \
--name blog \
-v /usr/local/blog/attachment:/app/.output/public/attachment \
-v /usr/local/blog/mysql:/var/lib/mysql \
-itd open-nuxt-blog:<version + n>
```

### 服务器迁移

```
仅支持相同Blog版本之间迁移
```


### Build

```bash
# 环境
# 1.网络
# 2.Node18+
# 3.Git

git clone https://github.com/difffffft/open-nuxt-blog.git

docker build -t open-nuxt-blog .

docker tag open-nuxt-blog:latest <your-docker-hub-username>/open-nuxt-blog:<version>

docker push <your-docker-hub-username>/open-nuxt-blog:<version>


# 本地运行/测试
# local
docker run -itd -p 3000:3000 -p 3306:3306 --name blog open-nuxt-blog
```