import SiteConfigService from "@/server/service/SiteConfigService";

const siteConfigService = new SiteConfigService();
export default defineWrappedResponseHandler(async (event) => {
  defineHasAuthority(event, "site:config:save")

  const siteConfigData = await readBody(event);
  const result = await siteConfigService.createSiteConfig(siteConfigData);
  return defineOk({ data: result });
});
