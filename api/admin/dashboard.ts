import useApi from "@/utils/api";

export const useAdminDashboardBasicApi = <T = any[]>() => {
  return useApi<T>("/api/admin/dashboard/basic", { method: "GET" });
};

export const useAdminDashboardYearApi = <T = any[]>() => {
  return useApi<T>("/api/admin/dashboard/year", { method: "GET" });
};

export const useAdminDashboardCategoryApi = <T = any[]>() => {
  return useApi<T>("/api/admin/dashboard/category", { method: "GET" });
};