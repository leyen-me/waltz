# Simple to use

```bash
# online
docker run -itd -p 3000:3000 -p 3306:3306 --name blog difffffft/open-nuxt-blog:2.3

# local
docker run -itd -p 3000:3000 -p 3306:3306 --name blog open-nuxt-blog
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
```