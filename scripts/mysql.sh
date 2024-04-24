docker run -idt -p 3306:3306 --privileged=true \
-e TZ=Asia/Shanghai \
-e MYSQL_DATABASE=open-nuxt-blog \
-e MYSQL_ROOT_PASSWORD=JGhQ83axm5ydtQEnX8B3RgtqnFIY6U3+TO5VMMVyLxA= \
--name open-nuxt-blog mysql:8.0.20