import useApi from "@/utils/api";
import type Article from "~/server/models/Article";

export const useWebArticlePageApi = <T = BasePageResponse<Article>>(
  query: ArticleQuery
) => {
  return useApi<T>(
    `/api/web/article/page?page=${query.page}&limit=${query.limit}&categoryId=${query.categoryId}&tagId=${query.tagId}`,
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

export const useWebArticleAdjacentApi = <T = Article>(
  id: number,
  categoryId: number
) => {
  return useApi<T>(
    `/api/web/article/adjacent?id=${id}&categoryId=${categoryId}`,
    {
      method: "GET",
    }
  );
};
