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
