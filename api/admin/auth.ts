import useApi from "@/utils/api";

export const useAdminLoginApi = (body: any) => {
  return useApi("/api/admin/auth/login", { method: "POST", body: JSON.stringify(body) });
};
