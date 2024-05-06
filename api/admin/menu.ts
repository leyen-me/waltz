import useApi from "@/utils/api";

export const useAdminMenuListApi = <T = any>() => {
  return useApi<T>("/api/admin/menu/list", { method: "GET" });
};
