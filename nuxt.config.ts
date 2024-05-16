// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["@/assets/css/main.css"],
  modules: ["@tdesign-vue-next/nuxt", "@pinia/nuxt"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  devtools: { enabled: true },
  pages: true,
  devServer: {
    host: "0.0.0.0",
    port: 3000,
  },
  routeRules: {
    "/blog/**": { ssr: false },
    "/admin/**": { ssr: false },
    "/api/**": { cors: true },
  },
  runtimeConfig: {
    /**
     * 读取 .env 文件中配置变量
     * Reading configuration variables from .env files
     */
    ...Object.entries(process.env).reduce(
      (acc, [key, value]) =>
        key.startsWith("NUXT_") ? { ...acc, [key]: value } : acc,
      {}
    ),
    public: {
      // 前后端分离时打开
      apiBase: "http://localhost:3000",
    },
  },
});
