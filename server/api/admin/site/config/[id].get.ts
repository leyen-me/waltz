import SiteConfigService from '@/server/service/SiteConfigService';

const siteConfigService = new SiteConfigService();
export default defineWrappedResponseHandler(async (event) => {
    defineHasAuthority(event, "site:config:info")

    const { id } = getRouterParams(event);
    const result = await siteConfigService.getSiteConfigById(Number(id));
    return defineOk({ data: result });
});