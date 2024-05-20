# 基础
FROM ubuntu:latest

# 设置时区环境变量
ENV TZ=Asia/Shanghai
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# 环境变量
ENV MYSQL_ROOT_PASSWORD=JGhQ83axm5ydtQEnX8B3RgtqnFIY6U3+TO5VMMVyLxA=

# 安装mysql
RUN apt-get update && apt-get install -y mysql-server

# 拷贝mysql配置文件
COPY ./deploy/mysql/mysql.conf.d/mysqld.cnf /etc/mysql/mysql.conf.d/mysqld.cnf

# 安装node和npm
RUN apt-get install -y nodejs npm wget
RUN npm install -g n && n 18.9.1

# 拷贝源码
RUN mkdir -p /app
COPY . /app

# 安装依赖
WORKDIR /app
RUN npm install && npm run build

# 暴露端口
EXPOSE 3000 3306

# 初始化 MySQL 并运行应用
CMD service mysql start && \
    sleep 5 && \
    mysql -u root -p$MYSQL_ROOT_PASSWORD -e "UPDATE mysql.user SET host='%' WHERE user='root'; FLUSH PRIVILEGES;" && \
    cd /app/.output/server && \
    node index.mjs
