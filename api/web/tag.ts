import useApi from "@/utils/api";
import type Tag from "@/server/models/Tag";

export const useWebTagListApi = <T = Tag[]>() => {
  return useApi<T>("/api/web/tag/list", { method: "GET" });
};