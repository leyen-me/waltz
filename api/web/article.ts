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
