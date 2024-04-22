docker run -idt -p 3306:3306 --privileged=true \
-e TZ=Asia/Shanghai \
-e MYSQL_DATABASE=open-nuxt-blog-mysql \
-e MYSQL_ROOT_PASSWORD=pdBGKGjRyX3Jb2Hn \
--name open-nuxt-blog-mysql mysql:8.0.20