import useAppStore from "~/stores/appStore";
import useUserStore from "~/stores/userStore";
import { validateChatGptRoute } from "@/utils/routerUtil";

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
      if (!validateChatGptRoute(to)) {
        return navigateTo("/404");
      }
      return;
    }
    await appStore.initSystem();
    return navigateTo(to.fullPath);
  } catch (error) {
    return navigateTo("/admin/login");
  }
});
