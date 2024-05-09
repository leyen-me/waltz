import useApi from "@/utils/api";
import type Role from "~/server/models/Role";

export const useAdminRoleListApi = <T = Role[]>() => {
  return useApi<T>("/api/admin/role/list", { method: "GET" });
};

export const useAdminRoleDeleteApi = <T = Role>(id: number) => {
  return useApi<T>(`/api/admin/role/`, {
    method: "DELETE",
    body: JSON.stringify([id]),
  });
};

export const useAdminRoleInfoApi = <T = Role>(id: number) => {
  return useApi<T>(`/api/admin/role/${id}`, {
    method: "GET",
  });
};

export const useAdminRoleSubmitApi = <T = any>(body: Partial<Role>) => {
  if (body.id) {
    return useApi<T>(`/api/admin/role/`, {
      method: "PUT",
      body: JSON.stringify(body),
    });
  } else {
    return useApi<T>(`/api/admin/role/`, {
      method: "POST",
      body: JSON.stringify(body),
    });
  }
};
