import type { UseFetchOptions } from "#app";
import { MessagePlugin } from "tdesign-vue-next";

const useApi = async <T>(
  url: string,
  options: UseFetchOptions<any>
): Promise<T> => {
  const token = useCookie("token", {
    default: () => "",
    watch: false,
  });
  const config = useRuntimeConfig();
  const _res = await useFetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: token.value,
    },
    baseURL: config.public.apiBase,
    ...options,
  });
  const res = _res.data.value as BaseResponse<T>;
  if (res === null) {
    let msg = "请求错误，请检查网络或服务器";
    MessagePlugin.error(msg);
    throw Error(msg);
  }
  if (res.code === 500 || res.code === 403) {
    MessagePlugin.error(res.msg as string);
    throw Error(res.msg);
  }
  if (res.code === 401) {
    MessagePlugin.error("登录已失效，请重新登录");
    useRouter().push("/admin/login");
    // 重定向
    throw Error(res.msg);
  }
  return res.data as T;
};

export default useApi;
