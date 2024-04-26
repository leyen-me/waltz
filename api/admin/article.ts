import useApi from "@/utils/api";

export const useAdminArticlePageApi = () => {
  return useApi("/api/admin/article/page?page=1&limit=10", {
    method: "GET",
  });
};
