import { useWebSiteConfigListApi } from "~/api/web/config";
import useAppStore from "~/stores/appStore";
import useUserStore from "~/stores/userStore";

/**
 * 前台路由守卫
 */
export default defineNuxtRouteMiddleware(async (to, from) => {
  const token = useCookie("token", {
    default: () => "",
    watch: false,
  });
  const userStore = useUserStore();
  const appStore = useAppStore();
  try {
    appStore.web.loading = true;
    const dbConfig = await useWebSiteConfigListApi();
    dbConfig.map((siteConfig) => {
      if (siteConfig.type === "boolean") {
        siteConfig.value = (siteConfig.value === "true"
          ? true
          : false) as unknown as string;
      }
      appStore.siteConfig[siteConfig.key] = siteConfig.value;
    });
  } catch (error) {
    // todo:跳转到500
  } finally {
    appStore.web.loading = false;
  }
});
