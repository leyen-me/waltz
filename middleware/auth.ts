export default defineNuxtRouteMiddleware((to, from) => {
  const token = useCookie("token", {
    default: () => "",
    watch: false,
  });
  if (!token.value) {
    return navigateTo("/admin/login");
  }
});
