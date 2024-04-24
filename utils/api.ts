export const useGetApi = async (url: string) => {
  const token = useCookie("token", {
    default: () => "",
    watch: false,
  });
  const _res = await useFetch(url, {
    method: "GET",
    headers: {
      Authorization: token.value,
    },
  });
  const res = _res.data.value as unknown as MResponse;
  if (res.code !== 200) {
    throw Error(res.msg);
  }
  return res.data;
};

export const usePostApi = async (url: string, data: any) => {
  const token = useCookie("token", {
    default: () => "",
    watch: false,
  });
  const _res = await useFetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Authorization: token.value,
    },
  });
  const res = _res.data.value as unknown as MResponse;
  if (res.code !== 200) {
    throw Error(res.msg);
  }
  return res.data;
};
