import useUserStore from "~/stores/userStore";

const useHasAuth = (auth: string): boolean => {
  const userStore = useUserStore();
  const has = userStore.authorityList.find((v) => v === auth);
  if (has) {
    return true;
  }
  return false;
};

export default useHasAuth;
