import useApi from "@/utils/api";
import type Article from "~/server/models/Article";

export const useAdminArticlePageApi = <T = BasePageResponse<Article>>() => {
  return useApi<T>("/api/admin/article/page?page=1&limit=10", {
    method: "GET",
  });
};
