import type { UseFetchOptions } from "#app";

const useApi = async <T>(
  url: string,
  options: UseFetchOptions<any>
): Promise<T> => {
  const token = useCookie("token", {
    default: () => "",
    watch: false,
  });
  const nuxtApp = useNuxtApp();
  const toast = nuxtApp.vueApp.config.globalProperties.$toast;
  const _res = await useFetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: token.value,
    },
    ...options,
  });
  const res = _res.data.value as BaseResponse<T>;
  if (res === null) {
    toast.add({
      severity: "error",
      summary: "错误",
      detail: "请求错误，请检查网络或服务器",
      life: 3000,
    });
    throw Error("请求错误，请检查网络或服务器");
  }
  if (res.code === 500 || res.code === 403) {
    toast.add({
      severity: "error",
      summary: "错误",
      detail: res.msg,
      life: 3000,
    });
    throw Error(res.msg);
  }
  if (res.code === 401) {
    toast.add({
      severity: "error",
      summary: "错误",
      detail: "登录已失效，请重新登录",
      life: 3000,
    });
    useRouter().push("/admin/login");
    // 重定向
    throw Error(res.msg);
  }
  return res.data as T;
};

export default useApi;
