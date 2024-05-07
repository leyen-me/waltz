import useApi from "@/utils/api";
import type Menu from "~/server/models/Menu";

export const useAdminMenuListApi = <T = any>() => {
  return useApi<T>("/api/admin/menu/list", { method: "GET" });
};

export const useAdminMenuInfoApi = <T = Menu>(id: number) => {
  return useApi<T>(`/api/admin/menu/${id}`, {
    method: "GET",
  });
};

export const useAdminMenuSubmitApi = <T = any>(body: Partial<Menu>) => {
  if (body.id) {
    return useApi<T>(`/api/admin/menu/`, {
      method: "PUT",
      body: JSON.stringify(body),
    });
  } else {
    return useApi<T>(`/api/admin/menu/`, {
      method: "POST",
      body: JSON.stringify(body),
    });
  }
};

export const useAdminMenuDeleteApi = <T = Menu>(id: number) => {
  return useApi<T>(`/api/admin/menu/`, {
    method: "DELETE",
    body: JSON.stringify([id]),
  });
};
