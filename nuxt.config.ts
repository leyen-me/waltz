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
  devtools: { enabled: false },
  pages: true,
  devServer: {
    host: "0.0.0.0",
    port: 3000,
  },
  routeRules: {
    "/": { ssr: false },
    "/blog/**": { ssr: true },
    "/admin/**": { ssr: false },
    "/api/**": { cors: true },
  },
  runtimeConfig: {
    /**
     * 读取 .env 文件中配置变量
     * Reading configuration variables from .env files
     */
    public: {
      ...Object.entries(process.env).reduce(
        (acc, [key, value]) =>
          key.startsWith("NUXT_") ? { ...acc, [key]: value } : acc,
        {}
      ),
    },
  },
});
