import useApi from "@/utils/api";
import type Comment from "@/server/models/Comment";

export const useAdminCommentListApi = <T = Comment[]>() => {
  return useApi<T>("/api/admin/comment/list", { method: "GET" });
};

export const useAdminCommentPageApi = <T = BasePageResponse<Comment>>(
  query: any
) => {
  return useApi<T>(
    `/api/admin/comment/page?page=${query.page}&limit=${query.limit}`,
    {
      method: "GET",
    }
  );
};

export const useAdminCommentInfoApi = <T = Comment>(id: number) => {
  return useApi<T>(`/api/admin/comment/${id}`, {
    method: "GET",
  });
};

export const useAdminCommentSubmitApi = <T = any>(body: Partial<Comment>) => {
  if (body.id) {
    return useApi<T>(`/api/admin/comment/`, {
      method: "PUT",
      body: JSON.stringify(body),
    });
  } else {
    return useApi<T>(`/api/admin/comment/`, {
      method: "POST",
      body: JSON.stringify(body),
    });
  }
};

export const useAdminCommentDeleteApi = <T = Comment>(id: number) => {
  return useApi<T>(`/api/admin/comment/`, {
    method: "DELETE",
    body: JSON.stringify([id]),
  });
};
