import SiteConfigService from '@/server/service/SiteConfigService';

const siteConfigService = new SiteConfigService();

export default defineWrappedResponseHandler(async (event) => {
    defineHasAuthority(event, "site:config:update")
    
    const { id, ...updatedSiteConfigData } = await readBody(event);
    await siteConfigService.updateSiteConfig(id, updatedSiteConfigData);
    return defineOk({});
});