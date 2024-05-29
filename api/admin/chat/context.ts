import useApi from "@/utils/api";
import type Context from "~/server/models/Context";

export const useAdminChatContextListApi = <T = Context[]>(chatId: number) => {
  return useApi<T>(`/api/admin/context/chat/${chatId}`, { method: "GET" });
};
