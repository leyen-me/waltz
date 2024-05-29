import useApi from "@/utils/api";
import type Context from "~/server/models/Context";

export const useAdminChatContextListApi = <T = Context[]>(chatId: number) => {
  return useApi<T>(`/api/admin/context/chat/${chatId}`, { method: "GET" });
};

export const useAdminChatContextSubmitApi = <T = any>(
  body: Partial<Context>
) => {
  if (body.id) {
    return useApi<T>(`/api/admin/context/`, {
      method: "PUT",
      body: JSON.stringify(body),
    });
  } else {
    return useApi<T>(`/api/admin/context/`, {
      method: "POST",
      body: JSON.stringify(body),
    });
  }
};
