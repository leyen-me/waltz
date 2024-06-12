import useApi from "@/utils/api";
import type Comment from "@/server/models/Comment";

export const useWebCommentArticlePageApi = <T = BasePageResponse<Comment>>(
  query: any
) => {
  return useApi<T>(
    `/api/web/comment/article/page?page=${query.page}&limit=${query.limit}&articleId=${query.articleId}`,
    {
      method: "GET",
    }
  );
};

export const useWebCommentPidPageApi = <T = BasePageResponse<Comment>>(
  query: any
) => {
  return useApi<T>(
    `/api/web/comment/pid/page?page=${query.page}&limit=${query.limit}&pid=${query.pid}`,
    {
      method: "GET",
    }
  );
};

export const useWebCommentSubmitApi = <T = any>(body: Partial<Comment>) => {
  if (body.id) {
    return useApi<T>(`/api/web/comment/`, {
      method: "PUT",
      body: JSON.stringify(body),
    });
  } else {
    return useApi<T>(`/api/web/comment/`, {
      method: "POST",
      body: JSON.stringify(body),
    });
  }
};
