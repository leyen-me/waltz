import { listToTree } from "~/common/utils/treeUtil";
import { getAllSiteConfigs } from "~/server/utils/siteConfigUtil";

export default defineWrappedResponseHandler(async (event) => {
  const { sceretSiteList } = await getAllSiteConfigs({});
  return defineOk({ data: listToTree(sceretSiteList, "id", "pid", 0) });
});
