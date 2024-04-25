import useApi from "@/utils/api";

export const useAdminUserInfoApi = () => {
  return useApi("/api/admin/user/info", { method: "GET" });
};
