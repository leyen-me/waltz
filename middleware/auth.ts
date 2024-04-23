import Cookies from "js-cookie";

export default defineNuxtRouteMiddleware((to, from) => {
  console.log(Cookies.get("token"));
  
  if (!Cookies.get("token")) {
    return navigateTo("/admin/login");
  }
});
