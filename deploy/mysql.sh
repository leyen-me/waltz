docker run -idt -p 3306:3306 --privileged=true \
-e TZ=Asia/Shanghai \
-e MYSQL_DATABASE=waltz \
-e MYSQL_ROOT_PASSWORD=JGhQ83axm5ydtQEnX8B3RgtqnFIY6U3+TO5VMMVyLxA= \
--name waltz mysql:8.0.20