import type { RouteLocationNormalized } from "vue-router";
import useAppStore from "~/stores/appStore";

export const validateChatGptRoute = (to: RouteLocationNormalized) => {
  const appStore = useAppStore();
  const matchRouter = "/app/chatgpt";
  if (
    to.path === matchRouter ||
    to.path === matchRouter + "/c/" + to.params.id
  ) {
    const nav = appStore.navList.find((nav) => nav.path === matchRouter);
    if (!nav) {
      return false;
    }
  }
  return true;
};
