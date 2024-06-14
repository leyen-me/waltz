import MenuService from '@/server/service/MenuService';
import MenuDeleteHasChildError from '~/server/error/sys/menu/MenuDeleteHasChildError';

const menuService = new MenuService();

export default defineWrappedResponseHandler(async (event) => {
    defineHasAuthority(event, "menu:delete")
    const id: number = await readBody(event);
    const hasChildStatus = await menuService.hasChildMenus(id);
    if (hasChildStatus) {
        throw new MenuDeleteHasChildError()
    }
    await menuService.deleteMenu(id);
    return defineOk({});
});