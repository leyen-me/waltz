import SiteConfigService from '@/server/service/SiteConfigService';
import { listToTree } from '~/common/utils/treeUtil';

const siteConfigService = new SiteConfigService();

export default defineWrappedResponseHandler(async (event) => {
    defineHasAuthority(event, "site:config:list")
    const { key } = getQuery(event);
    let result = await siteConfigService.getAllSiteConfigs(key as string);
    return defineOk({ data: listToTree(result, "id", "pid", 0) });
});
