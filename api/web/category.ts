import useApi from "@/utils/api";
import type Category from "@/server/models/Category";

export const useWebCategoryListApi = <T = Category[]>() => {
  return useApi<T>("/api/web/category/list", { method: "GET" });
};