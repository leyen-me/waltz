### Simple to use

```bash
docker run -itd -p 3000:3000 -p 3306:3306 --name blog difffffft/open-nuxt-blog:<version>
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