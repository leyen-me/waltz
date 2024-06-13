import useApi from "@/utils/api";

export const useAdminChatContextListApi = <T = any[]>(chatId: number) => {
  return useApi<T>(`/api/admin/context/chat/${chatId}`, { method: "GET" });
};

export const useAdminChatContextSubmitApi = <T = any>(
  body: Partial<any>
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
