import { readEnvs, readNumber, readString } from "./common/utils/envUtil";

const envs = readEnvs();

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["@/assets/css/main.css"],
  app: {
    head: {
      link: [{ rel: "icon", type: "image/svg+xml", href: "/favicon.svg" }],
    },
  },
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
    host: readString(envs, "NUXT_SERVER_HOST"),
    port: readNumber(envs, "NUXT_SERVER_PORT"),
  },
  routeRules: {
    "/": { ssr: false },
    "/blog/**": { ssr: true },
    "/admin/**": { ssr: false },
    "/app/**": { ssr: false },
    "/api/**": { cors: true },
  },
  runtimeConfig: {
    /**
     * 读取 .env 文件中配置变量
     * Reading configuration variables from .env files
     */
    public: envs,
  },
});
