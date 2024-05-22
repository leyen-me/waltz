import MenuService from '@/server/service/MenuService';

const menuService = new MenuService();

export default defineWrappedResponseHandler(async (event) => {
    defineHasAuthority(event, "menu:delete")
    const id: number = await readBody(event);
    const hasChildStatus = await menuService.hasChildMenus(id);
    if (hasChildStatus) {
        return defineError({ msg: "该菜单下有子菜单，不能直接删除父菜单" });
    }
    await menuService.deleteMenu(id);
    return defineOk({});
});