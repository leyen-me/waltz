import { useWebSiteConfigListApi } from "~/api/web/config";
import { buildMap } from "~/common/utils/siteConfigUtil";
import useAppStore from "~/stores/appStore";

/**
 * 前台路由守卫
 */
export default defineNuxtRouteMiddleware(async (to, from) => {
  const appStore = useAppStore();
  try {
    appStore.web.loading = true;
    const dbConfig = await useWebSiteConfigListApi();
    const map = buildMap(dbConfig)
    appStore.siteConfig = map
  } catch (error) {
    // todo:跳转到500
  } finally {
    appStore.web.loading = false;
  }
});
