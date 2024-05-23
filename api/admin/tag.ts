import useApi from "@/utils/api";
import type Tag from "@/server/models/Tag";

export const useAdminTagListApi = <T = Tag[]>() => {
  return useApi<T>("/api/admin/tag/list", { method: "GET" });
};

export const useAdminTagInfoApi = <T = Tag>(id: number) => {
  return useApi<T>(`/api/admin/tag/${id}`, {
    method: "GET",
  });
};

export const useAdminTagSubmitApi = <T = any>(body: Partial<Tag>) => {
  if (body.id) {
    return useApi<T>(`/api/admin/tag/`, {
      method: "PUT",
      body: JSON.stringify(body),
    });
  } else {
    return useApi<T>(`/api/admin/tag/`, {
      method: "POST",
      body: JSON.stringify(body),
    });
  }
};

export const useAdminTagDeleteApi = <T = Tag>(id: number) => {
  return useApi<T>(`/api/admin/tag/`, {
    method: "DELETE",
    body: JSON.stringify([id]),
  });
};