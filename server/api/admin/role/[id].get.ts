import RoleService from '@/server/service/RoleService';
import RoleMenuService from '@/server/service/RoleMenuService';
const roleService = new RoleService();
const roleMenuService = new RoleMenuService();

export default defineWrappedResponseHandler(async (event) => {
    defineHasAuthority(event, "role:info")

    const { id } = getRouterParams(event);
    const result = await roleService.getRoleById(Number(id));
    if (result) {
        const menuIdList = await roleMenuService.getMenuIdList(Number(id));
        result.dataValues.menuIdList = menuIdList;
    }
    return defineOk({ data: result });
});