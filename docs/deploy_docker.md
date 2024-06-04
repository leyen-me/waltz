# Simple to use

```bash
# online
docker run -itd -p 3000:3000 -p 3306:3306 --name blog difffffft/open-nuxt-blog:2.0

# local
docker run -itd -p 3000:3000 -p 3306:3306 --name blog open-nuxt-blog

# if you use gpt
docker run -itd -p 3000:3000 -p 3306:3306 --name blog difffffft/open-nuxt-blog:2.0
```

# Build

```bash
docker build -t open-nuxt-blog .

docker tag open-nuxt-blog:latest <your-docker-hub-username>/open-nuxt-blog:latest

docker push <your-docker-hub-username>/open-nuxt-blog:latest
```