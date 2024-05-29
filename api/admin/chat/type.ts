import useApi from "@/utils/api";
import type Type from "~/server/models/Type";

export const useAdminChatTypeListApi = <T = Type[]>() => {
  return useApi<T>("/api/admin/type/list", { method: "GET" });
};
