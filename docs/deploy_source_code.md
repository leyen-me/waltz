# Env

```bash
apt-get update
apt-get install -y nodejs
apt-get install -y npm
apt-get install -y wget
npm install -g n
n 18.9.1
```

# Build

```bash
cd /app/open-nuxt-blog
npm install
npm run build
```

# Run

```bash
cd /app/open-nuxt-blog/.output/server/
node index.mjs
```