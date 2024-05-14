import useApi from "@/utils/api";
import type Article from "~/server/models/Article";

export const useWebArticlePageApi = <T = BasePageResponse<Article>>(
  query: ArticleQuery
) => {
  return useApi<T>(
    `/api/web/article/page?page=${query.page}&limit=${query.limit}`,
    {
      method: "GET",
    }
  );
};

export const useWebArticleInfoApi = <T = Article>(id: number) => {
  return useApi<T>(`/api/web/article/${id}`, {
    method: "GET",
  });
};

export const useWebArticleListApi = <T = Article[]>(title: string) => {
  return useApi<T>(`/api/web/article/list?title=${encodeURIComponent(title)}`, {
    method: "GET",
  });
};
