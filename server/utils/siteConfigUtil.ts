import { buildMap } from "~/common/utils/siteConfigUtil";
import SiteConfigService from "../service/SiteConfigService";
import SiteConfig from "../models/SiteConfig";

const siteConfigService = new SiteConfigService();

// 全局siteConfigs缓存
let siteList: SiteConfig[] = [];

// 不暴露密码
let sceretSiteList: SiteConfig[] = [];
let siteConfigs: Map<any, any> | null = null;

export const getAllSiteConfigs = async ({
  update,
}: {
  update?: Boolean;
}): Promise<{
  siteList: SiteConfig[];
  sceretSiteList: SiteConfig[];
  siteConfigs: Map<any, any>;
}> => {

  // 没有缓存就获取
  if ((!siteConfigs && siteList.length == 0) || update) {
    siteList = await siteConfigService.getAllSiteConfigs();
    sceretSiteList = await siteConfigService.getAllSiteConfigs("", true, 1);

    
    siteConfigs = buildMap(siteList);
  }
  return {
    siteList,
    sceretSiteList,

    // ts-ignore
    siteConfigs,
  };
};
