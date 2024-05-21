import SiteConfigService from '@/server/service/SiteConfigService';

const siteConfigService = new SiteConfigService();

export default defineWrappedResponseHandler(async (event) => {
    const { key } = getQuery(event);
    let result = await siteConfigService.getAllSiteConfigs(key as string);
    return defineOk({ data: result });
});
