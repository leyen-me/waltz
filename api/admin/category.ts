import useApi from "@/utils/api";
import type Category from "@/server/models/Category";

export const useAdminCategoryListApi = <T = Category[]>() => {
  return useApi<T>("/api/admin/category/list", { method: "GET" });
};

export const useAdminCategoryInfoApi = <T = Category>(id: number) => {
  return useApi<T>(`/api/admin/category/${id}`, {
    method: "GET",
  });
};

export const useAdminCategorySubmitApi = <T = any>(body: Partial<Category>) => {
  if (body.id) {
    return useApi<T>(`/api/admin/category/`, {
      method: "PUT",
      body: JSON.stringify(body),
    });
  } else {
    return useApi<T>(`/api/admin/category/`, {
      method: "POST",
      body: JSON.stringify(body),
    });
  }
};

export const useAdminCategoryDeleteApi = <T = Category>(id: number) => {
  return useApi<T>(`/api/admin/category/`, {
    method: "DELETE",
    body: JSON.stringify([id]),
  });
};