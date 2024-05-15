import useApi from "@/utils/api";
import type SiteConfig from "~/server/models/SiteConfig";

export const useAdminSiteConfigListApi = <T = SiteConfig[]>() => {
  return useApi<T>("/api/admin/site/config/list", { method: "GET" });
};

export const useAdminSiteConfigSubmitApi = <T = any>(body: Partial<SiteConfig>) => {
  if (body.id) {
    return useApi<T>(`/api/admin/site/config`, {
      method: "PUT",
      body: JSON.stringify(body),
    });
  } else {
    return useApi<T>(`/api/admin/site/config`, {
      method: "POST",
      body: JSON.stringify(body),
    });
  }
};
