import SiteConfigService from '@/server/service/SiteConfigService';

const siteConfigService = new SiteConfigService();

export default defineWrappedResponseHandler(async (event) => {
    defineHasAuthority(event, "site:config:delete")
    const ids: number[] = await readBody(event);

    await siteConfigService.deleteSiteConfig(ids);
    return defineOk({});
});