import MenuService from '@/server/service/MenuService';

const menuService = new MenuService();

export default defineWrappedResponseHandler(async (event) => {
    hasAuthority(event, "menu:list")
    let result = await menuService.getAllMenus(event.context.user)
    return defineOk({ data: listToTree(result, "id", "pid", 0) });
});
