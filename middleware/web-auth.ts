import { useWebUserInfoApi } from "~/api/admin/user";
import { useWebSiteConfigListApi } from "~/api/web/config";
import { buildMap } from "~/common/utils/siteConfigUtil";
import useAppStore from "~/stores/appStore";
import useUserStore from "~/stores/userStore";

/**
 * 前台路由守卫
 */
export default defineNuxtRouteMiddleware(async (to, from) => {
  const appStore = useAppStore();
  const userStore = useUserStore();
  try {
    appStore.web.loading = true;

    const [dbConfig] = await Promise.all([useWebSiteConfigListApi()]);
    const map = buildMap(dbConfig);
    appStore.siteConfig = map;
    
    try {
      const [userinfo] = await Promise.all([useWebUserInfoApi()]);
      userStore.user.id = userinfo.id as number;
    } catch (error) {}
  } catch (error) {
    // error
  } finally {
    appStore.web.loading = false;
  }
});
