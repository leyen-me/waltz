import MenuService from '@/server/service/MenuService';
const menuService = new MenuService();

export default defineWrappedResponseHandler(async (event) => {
    defineHasAuthority(event, "menu:update")

    const { id, pid, ...updatedMenuData } = await readBody(event);
    if (id === pid) {
        return defineError({ msg: "上级菜单不能为自己" });
    }
    await menuService.updateMenu(id, updatedMenuData);
    return defineOk({});
});