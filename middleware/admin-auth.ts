import { useAdminUserInfoApi } from "@/api/admin/user";
import { useAdminDictTypeListApi } from "~/api/admin/dict";
import useAppStore from "~/stores/appStore";
import useUserStore from "~/stores/userStore";

/**
 * 后台管理路由守卫
 * Backend management route guards
 */
export default defineNuxtRouteMiddleware(async (to, from) => {
  const token = useCookie("token", { default: () => "", watch: false });
  const userStore = useUserStore();
  const appStore = useAppStore();
  if (!token.value) {
    return navigateTo("/admin/login");
  }
  try {
    if (userStore.user.id) {
      return;
    }
    /**
     * 获取用户基本信息/获取字典列表
     * Obtain basic user information/obtain dictionary list
     */
    const [userinfo, dictList] = await Promise.all([
      useAdminUserInfoApi(),
      useAdminDictTypeListApi(),
    ]);
    userStore.user.id = userinfo.id as number;
    userStore.authorityList = userinfo.authorityList as string[];
    appStore.dictList = dictList;
  } catch (error) {
    return navigateTo("/admin/login");
  }
});
