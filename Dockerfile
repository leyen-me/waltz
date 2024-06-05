# 基础
FROM ubuntu:latest

# 设置时区环境变量
ENV TZ=Asia/Shanghai
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# 环境变量
ENV MYSQL_ROOT_PASSWORD=JGhQ83axm5ydtQEnX8B3RgtqnFIY6U3+TO5VMMVyLxA=

# 安装数据库、NodeJs、Npm、n
RUN apt-get update && apt-get install -y mysql-server && apt-get install -y nodejs && apt-get install -y npm && apt-get install -y wget && npm install -g n && n 18.12.0 && npm install -g pnpm

# 配置文件
COPY ./deploy/mysql/mysql.conf.d/mysqld.cnf /etc/mysql/mysql.conf.d/mysqld.cnf
COPY ./deploy/mysql/init.d/init.sql /etc/mysql/init.d/init.sql

# 初始化数据库密码，Host，Init.sql
RUN mysqld & sleep 5 && \
mysql -u root -e  "ALTER USER 'root'@'localhost' IDENTIFIED WITH caching_sha2_password BY '${MYSQL_ROOT_PASSWORD}';FLUSH PRIVILEGES;" && \
mysql -u root -p${MYSQL_ROOT_PASSWORD} -e "use mysql;update user set host='%' where user='root';FLUSH PRIVILEGES;" && \
mysql -u root -p${MYSQL_ROOT_PASSWORD} < /etc/mysql/init.d/init.sql

# 拷贝源码
RUN mkdir -p /app
COPY . /app

# 安装依赖
WORKDIR /app

# 构建打包
RUN pnpm install && pnpm build

# 暴露端口
EXPOSE 3000 3306

# 数据库持久化
VOLUME /var/lib/mysql
VOLUME /app/.output/public/attachment

# 入口命令
CMD ["sh", "-c", "./deploy/start.sh"]