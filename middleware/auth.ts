/**
 * 后台管理路由守卫
 */
export default defineNuxtRouteMiddleware(async (to, from) => {
  const token = useCookie("token", {
    default: () => "",
    watch: false,
  });
  if (!token.value) {
    return navigateTo("/admin/login");
  }

  // 请求一下INFO信息
  try {
    await useGetApi("/api/admin/user/info");
  } catch (error) {
    return navigateTo("/admin/login");
  }
});
