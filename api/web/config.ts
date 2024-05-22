import useApi from "@/utils/api";
import type SiteConfig from "~/server/models/SiteConfig";

export const useWebSiteConfigListApi = <T = SiteConfig[]>() => {
  return useApi<T>("/api/web/site/config/list", { method: "GET" });
};