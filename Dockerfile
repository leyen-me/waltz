# 基础
FROM ubuntu:latest

# 环境变量
ENV MYSQL_ROOT_PASSWORD=JGhQ83axm5ydtQEnX8B3RgtqnFIY6U3+TO5VMMVyLxA=

# 安装mysql
RUN apt-get update
RUN apt-get install -y mysql-server
COPY ./deploy/mysql/mysql.conf.d/mysqld.cnf /etc/mysql/mysql.conf.d/mysqld.cnf

# 安装node
RUN apt-get install -y nodejs
RUN apt-get install -y npm
RUN apt-get install -y wget
RUN npm install -g n
RUN n 18.9.1

# 拷贝源码
RUN mkdir -p /app
COPY . /app

# 安装依赖
WORKDIR /app
RUN npm install
RUN npm run build

# 暴露端口
EXPOSE 3000 3306

# 入口命令
ENTRYPOINT ["/bin/sh", "-c", "mysqld & sleep 5 && use mysql;select host,authentication_string,user from user set host='%',authentication_string='JGhQ83axm5ydtQEnX8B3RgtqnFIY6U3+TO5VMMVyLxA=' where user='root';flush privileges;"]
ENTRYPOINT ["/bin/sh", "-c", "cd ./.output/server/ && node index.mjs"]