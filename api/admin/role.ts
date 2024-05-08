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
