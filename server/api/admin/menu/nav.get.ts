import MenuService from '@/server/service/MenuService';
import { listToTree } from '~/common/utils/treeUtil';

const menuService = new MenuService();

export default defineWrappedResponseHandler(async (event) => {
    let result = await menuService.getNav(event.context.user, 'menu');
    
    return defineOk({ data: listToTree(result, "id", "pid", 0) });
});
