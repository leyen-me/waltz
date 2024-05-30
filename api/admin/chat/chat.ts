import useApi from "@/utils/api";
import type Chat from "~/server/models/Chat";

export const useAdminChatChatListApi = <T = Chat[]>() => {
  return useApi<T>("/api/admin/chat/list", { method: "GET" });
};

export const useAdminChatChatInfoApi = <T = Chat>(id: number) => {
  return useApi<T>(`/api/admin/chat/${id}`, {
    method: "GET",
  });
};

export const useAdminChatResumeApi = <T = any>(body: { chatId: number }) => {
  return useApi<T>(`/api/admin/chat/resume/`, {
    method: "POST",
    body: JSON.stringify(body),
  });
};

export const useAdminChatDeleteApi = <T = Chat>(id: number) => {
  return useApi<T>(`/api/admin/chat/`, {
    method: "DELETE",
    body: JSON.stringify([id]),
  });
};


export const useAdminChatDeleteAllApi = <T = Chat>() => {
  return useApi<T>(`/api/admin/chat/all`, {
    method: "DELETE",
  });
};

export const useAdminChatChatSubmitApi = <T = any>(body: Partial<Chat>) => {
  if (body.id) {
    return useApi<T>(`/api/admin/chat/`, {
      method: "PUT",
      body: JSON.stringify(body),
    });
  } else {
    return useApi<T>(`/api/admin/chat/`, {
      method: "POST",
      body: JSON.stringify(body),
    });
  }
};
