import useApi from "@/utils/api";
import type Type from "~/server/models/Type";

export const useAdminChatTypeListApi = <T = Type[]>() => {
  return useApi<T>("/api/admin/type/list", { method: "GET" });
};

export const useAdminChatTypePageApi = <T = BasePageResponse<Type>>(
  query: any
) => {
  return useApi<T>(
    `/api/admin/type/page?page=${query.page}&limit=${query.limit}`,
    {
      method: "GET",
    }
  );
};

export const useAdminChatTypeInfoApi = <T = Type>(id: number) => {
  return useApi<T>(`/api/admin/type/${id}`, {
    method: "GET",
  });
};

export const useAdminChatTypeDeleteApi = <T = Type>(id: number) => {
  return useApi<T>(`/api/admin/type/`, {
    method: "DELETE",
    body: JSON.stringify([id]),
  });
};

export const useAdminChatTypeSubmitApi = <T = any>(body: Partial<Type>) => {
  if (body.id) {
    return useApi<T>(`/api/admin/type/`, {
      method: "PUT",
      body: JSON.stringify(body),
    });
  } else {
    return useApi<T>(`/api/admin/type/`, {
      method: "POST",
      body: JSON.stringify(body),
    });
  }
};
