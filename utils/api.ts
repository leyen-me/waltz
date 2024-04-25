

export const useGetApi = async (url: string) => {
  const runtimeConfig = useRuntimeConfig();
  const token = useCookie("token", {
    default: () => "",
    watch: false,
  });
  const _res = await useFetch(url, {
    method: "GET",
    baseURL: runtimeConfig.public.apiBase,
    headers: {
      Authorization: token.value,
    },
  });
  const res = _res.data.value as unknown as MResponse<any>;
  if (res.code !== 200) {
    throw Error(res.msg);
  }
  return res.data;
};

export const usePostApi = async (url: string, data: any) => {
  const runtimeConfig = useRuntimeConfig();
  const token = useCookie("token", {
    default: () => "",
    watch: false,
  });
  const _res = await useFetch(url, {
    method: "POST",
    baseURL: runtimeConfig.public.apiBase,
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Authorization: token.value,
    },
  });
  const res = _res.data.value as unknown as MResponse<any>;
  if (res.code !== 200) {
    throw Error(res.msg);
  }
  return res.data;
};
