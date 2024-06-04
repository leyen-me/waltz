import MenuService from '@/server/service/MenuService';
import { listToTree } from '~/common/utils/treeUtil';

const menuService = new MenuService();

export default defineWrappedResponseHandler(async (event) => {
    defineHasAuthority(event, "menu:list")
    let result = await menuService.getAllMenus(event.context.user);
    return defineOk({ data: listToTree(result, "id", "pid", 0) });
});
