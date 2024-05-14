import MenuService from '@/server/service/MenuService';
const menuService = new MenuService();

export default defineWrappedResponseHandler(async (event) => {
    defineHasAuthority(event, "menu:info")

    const { id } = getRouterParams(event);
    const result = await menuService.getMenuById(id);
    return defineOk({ data: result });
});