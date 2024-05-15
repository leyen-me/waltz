import MenuService from '@/server/service/MenuService';
const menuService = new MenuService();

export default defineWrappedResponseHandler(async (event) => {
    defineHasAuthority(event, "menu:update")
    
    const { id, ...updatedMenuData } = await readBody(event);
    await menuService.updateMenu(id, updatedMenuData);
    return defineOk({});
});