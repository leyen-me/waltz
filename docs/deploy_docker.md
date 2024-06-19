### Simple to use

```bash
# 直接使用
docker run -itd -p 3000:3000 -p 3306:3306 --name blog difffffft/waltz:<version>
```

### Build

```bash
# 克隆源码
git clone https://github.com/difffffft/waltz.git

# 开始构建
docker build -t waltz .

# 给镜像指定版本
docker tag waltz:latest <your-docker-hub-username>/waltz:<version>

# 登录到DockerHub
docker login

# 推送到DockerHub
docker push <your-docker-hub-username>/waltz:<version>

# 本地运行/测试
docker run -itd -p 3000:3000 -p 3306:3306 --name blog waltz
```