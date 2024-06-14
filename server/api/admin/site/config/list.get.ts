import { listToTree } from "~/common/utils/treeUtil";
import { getAllSiteConfigs } from "~/server/utils/siteConfigUtil";

export default defineWrappedResponseHandler(async (event) => {
  defineHasAuthority(event, "site:config:list");
  const { siteList } = await getAllSiteConfigs({});
  return defineOk({ data: listToTree(siteList, "id", "pid", 0) });
});
