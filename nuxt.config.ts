import os from "os";

// fix host
function getLocalIP() {
  let interfaces = os.networkInterfaces();
  let localIP = null;
  Object.keys(interfaces).forEach((iface) => {
    // @ts-ignore
    interfaces[iface].forEach((alias) => {
      if (
        alias.family === "IPv4" &&
        alias.address !== "127.0.0.1" &&
        alias.address.startsWith("192.168.31.")
      ) {
        localIP = alias.address;
        return;
      }
    });
  });
  return localIP || "localhost";
}

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
    host: getLocalIP(),
    port: 3000,
  },
  routeRules: {
    "/": { prerender: true },
    "/blog/**": { isr: true },
    "/admin/**": { ssr: false },
    "/api/**": { cors: true },
  },
  runtimeConfig: {
    // 只在服务器端可用的私有键
    apiSecret: "123",
    // public中的键也可以在客户端使用
    public: {
      apiBase: "http://192.168.31.76:3000",
    },
  },
});
