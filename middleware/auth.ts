import { useAdminUserInfoApi } from "@/api/admin/user";
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
  if (!token.value) {
    return navigateTo("/admin/login");
  }
  try {
    const userinfo = await useAdminUserInfoApi();
    userStore.authorityList = userinfo.authorityList as string[];
  } catch (error) {
    return navigateTo("/admin/login");
  }
});
