import MenuService from '@/server/service/MenuService';
const menuService = new MenuService();

export default defineWrappedResponseHandler(async (event) => {
    defineHasAuthority(event, "menu:update")
    const { id, pid, ...updatedMenuData } = await readBody(event);
    await menuService.updateMenu(id, updatedMenuData);
    return defineOk({});
});