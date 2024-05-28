import useApi from "@/utils/api";
import type Chat from "~/server/models/Chat";

export const useAdminChatChatInfoApi = <T = Chat>(id: number) => {
  return useApi<T>(`/api/admin/chat/${id}`, {
    method: "GET",
  });
};
