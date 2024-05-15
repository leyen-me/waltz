import { useAdminUserInfoApi } from "@/api/admin/user";
import { useAdminDictTypeListApi } from "~/api/admin/dict";
import useAppStore from "~/stores/appStore";
import useUserStore from "~/stores/userStore";

/**
 * 后台管理路由守卫
 */
export default defineNuxtRouteMiddleware(async (to, from) => {
  const token = useCookie("token", {
    default: () => "",
    watch: false,
  });
  const userStore = useUserStore();
  const appStore = useAppStore();
  if (!token.value) {
    return navigateTo("/admin/login");
  }
  try {
    if (userStore.authorityList.length > 0) {
      return;
    }
    const userinfo = await useAdminUserInfoApi();
    userStore.authorityList = userinfo.authorityList as string[];

    const dictList = await useAdminDictTypeListApi();
    appStore.dictList = dictList;
  } catch (error) {
    return navigateTo("/admin/login");
  }
});
