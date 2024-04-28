import type { UseFetchOptions } from "#app";

const useApi = async <T>(url: string, options: UseFetchOptions<any>):Promise<T> => {
  const token = useCookie("token", {
    default: () => "",
    watch: false,
  });
  const _res = await useFetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: token.value,
    },
    ...options,
  });
  const res = _res.data.value
  if (res === null) {
    throw Error("请求错误，请检查网络或服务器");
  }
  if (res.code !== 200) {
    throw Error(res.msg);
  }
  return res.data;
};

export default useApi;
