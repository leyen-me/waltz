# MySql

```bash
sudo apt-get install -y docker.io
sudo docker run -idt -p 3306:3306 \
--restart=always \
--privileged=true \
-e TZ=Asia/Shanghai \
-e MYSQL_DATABASE=waltz \
-e MYSQL_ROOT_PASSWORD=JGhQ83axm5ydtQEnX8B3RgtqnFIY6U3+TO5VMMVyLxA= \
--name waltz mysql:8.0.20

sudo docker cp ./deploy/mysql/init.d/init.sql waltz:/tmp/
sudo docker exec -it waltz sh 
mysql -uroot -pJGhQ83axm5ydtQEnX8B3RgtqnFIY6U3+TO5VMMVyLxA= < /tmp/init.sql
```

# Env

```bash
# ubuntu 20.04
sudo apt-get update
sudo apt-get install -y nodejs
sudo apt-get install -y npm
sudo apt-get install -y wget
sudo npm install -g n
sudo n 18.9.1
```

# Build

```bash
sudo git clone https://github.com/difffffft/waltz.git
cd /waltz
sudo pnpm i
sudo pnpm build
```

# Run

```bash
cd .output/server/

# 后台运行
nohup sudo node index.mjs &

# 当你需要停止服务时
ps aux
sudo kill <process_id>
```

# Domain

```bash
# 安装Nginx
sudo apt-get install -y nginx

# 编辑配置文件
cd /etc/nginx/sites-enabled
sudo vi default

# 配置反向代理
server {
    listen 80;
    server_name <your-domain>;  

    client_max_body_size 1024M;

    location / {
        proxy_pass http://127.0.0.1:3000; 
        proxy_set_header Host $host;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        client_max_body_size 1024m;
    }
}

# 重启Nginx
sudo service nginx restart
```
