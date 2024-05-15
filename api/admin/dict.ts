import useApi from "@/utils/api";

export const useAdminDictPageApi = <T = BasePageResponse<Dict>>(query: any) => {
  return useApi<T>(
    `/api/admin/dict/page?page=${query.page}&limit=${query.limit}`,
    {
      method: "GET",
    }
  );
};

export const useAdminDictInfo = <T = Dict>(id: number) => {
  return useApi<T>(`/api/admin/dict/${id}`, {
    method: "GET",
  });
};

export const useAdminDictSubmitApi = <T = any>(body: Partial<Dict>) => {
  if (body.id) {
    return useApi<T>(`/api/admin/dict/`, {
      method: "PUT",
      body: JSON.stringify(body),
    });
  } else {
    return useApi<T>(`/api/admin/dict/`, {
      method: "POST",
      body: JSON.stringify(body),
    });
  }
};

export const useAdminDictDeleteApi = <T = Dict>(id: number) => {
  return useApi<T>(`/api/admin/dict/`, {
    method: "DELETE",
    body: JSON.stringify([id]),
  });
};
