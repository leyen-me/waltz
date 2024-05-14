import SiteConfigService from '@/server/service/SiteConfigService';

const siteConfigService = new SiteConfigService();

export default defineWrappedResponseHandler(async (event) => {
    defineHasAuthority(event, "site:config:page")

    const query: SiteConfigQuery = getQuery(event);
    const result = await siteConfigService.selectPage(query);
    return defineOk({ data: result });
});
