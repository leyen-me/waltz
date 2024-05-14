import MenuService from '@/server/service/MenuService';

const menuService = new MenuService();

export default defineWrappedResponseHandler(async (event) => {
    defineHasAuthority(event, "menu:list")
    let result = await menuService.getAllMenus(event.context.user);
    return defineOk({ data: defineListToTree(result, "id", "pid", 0) });
});
