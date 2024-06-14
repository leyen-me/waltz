### Simple to use

```bash
# 直接使用
docker run -itd -p 3000:3000 -p 3306:3306 --name blog difffffft/open-nuxt-blog:<version>
```

### Build

```bash
# 克隆源码
git clone https://github.com/difffffft/open-nuxt-blog.git

# 开始构建
docker build -t open-nuxt-blog .

# 给镜像指定版本
docker tag open-nuxt-blog:latest <your-docker-hub-username>/open-nuxt-blog:<version>

# 登录到DockerHub
docker login

# 推送到DockerHub
docker push <your-docker-hub-username>/open-nuxt-blog:<version>

# 本地运行/测试
docker run -itd -p 3000:3000 -p 3306:3306 --name blog open-nuxt-blog
```