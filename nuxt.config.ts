// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["~/assets/css/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  devtools: { enabled: false },
  pages: true,
  devServer: {
    host: "0.0.0.0",
    port: 3000,
  },
  routeRules: {
    "/api/**": {
      cors: true,
    },
  },
  vite: {
    // 前后端分离
    // 上线之后去除
    server: {
      proxy: {
        "/api": {
          target: "http://192.168.31.76:3000",
          changeOrigin: true,
        },
      },
    },
  },
  runtimeConfig: {
    // 只在服务器端可用的私有键
    apiSecret: "123",
    // public中的键也可以在客户端使用
    public: {
      apiBase: "http://192.168.31.76:3000/api",
    },
  },
});
