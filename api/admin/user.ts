import useApi from "@/utils/api";
import type User from "@/server/models/User";

export const useAdminUserPageApi = <T = BasePageResponse<User>>(query: any) => {
  return useApi<T>(
    `/api/admin/user/page?page=${query.page}&limit=${query.limit}`,
    {
      method: "GET",
    }
  );
};

export const useAdminUserFindOneApi = <T = User>(id: number) => {
  return useApi<T>(`/api/admin/user/${id}`, {
    method: "GET",
  });
};

export const useAdminUserSubmitApi = <T = any>(body: Partial<User>) => {
  if (body.id) {
    return useApi<T>(`/api/admin/user/`, {
      method: "PUT",
      body: JSON.stringify(body),
    });
  } else {
    return useApi<T>(`/api/admin/user/`, {
      method: "POST",
      body: JSON.stringify(body),
    });
  }
};

export const useAdminUserInfoApi = () => {
  return useApi("/api/admin/user/info", { method: "GET" });
};

export const useAdminUserDeleteApi = <T = User>(id: number) => {
  return useApi<T>(`/api/admin/user/`, {
    method: "DELETE",
    body: JSON.stringify([id]),
  });
};
