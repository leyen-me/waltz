import useApi from "@/utils/api";
import type Article from "~/server/models/Article";

export const useAdminArticlePageApi = <T = BasePageResponse<Article>>(
  query: ArticleQuery
) => {
  return useApi<T>(
    `/api/admin/article/page?page=${query.page}&limit=${query.limit}`,
    {
      method: "GET",
    }
  );
};

export const useAdminArticleInfoApi = <T = Article>(id: number) => {
  return useApi<T>(`/api/admin/article/${id}`, {
    method: "GET",
  });
};

export const useAdminArticleSubmitApi = <T = any>(body: Partial<Article>) => {
  if (body.id) {
    return useApi<T>(`/api/admin/article/`, {
      method: "PUT",
      body: JSON.stringify(body),
    });
  } else {
    return useApi<T>(`/api/admin/article/`, {
      method: "POST",
      body: JSON.stringify(body),
    });
  }
};

export const useAdminArticleDeleteApi = <T = Article>(id: number) => {
  return useApi<T>(`/api/admin/article/`, {
    method: "DELETE",
    body: JSON.stringify([id]),
  });
};
