import MenuService from '@/server/service/MenuService';

const menuService = new MenuService();

export default defineWrappedResponseHandler(async (event) => {
    hasAuthority(event, "menu:delete")
    const ids: number[] = await readBody(event);

    await menuService.deleteMenus(ids);
    return defineOk({});
});