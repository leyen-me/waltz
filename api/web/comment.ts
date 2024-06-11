import useApi from "@/utils/api";
import type Comment from "@/server/models/Comment";

export const useWebCommentPageApi = <T = BasePageResponse<Comment>>(
  query: any
) => {
  return useApi<T>(
    `/api/web/comment/page?page=${query.page}&limit=${query.limit}`,
    {
      method: "GET",
    }
  );
};
