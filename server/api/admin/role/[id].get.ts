import RoleService from '@/server/service/RoleService';
const roleService = new RoleService();

export default defineWrappedResponseHandler(async (event) => {

    const { id } = getRouterParams(event);

    //  // 检查用户权限，这里假设用户需要具有 'sys:role:info' 权限才能访问该接口
    //  if (!checkPermission(event.context.user, 'sys:role:info')) {
    //     return defineUnauthorized({ message: 'Unauthorized: Insufficient permissions' });
    // }

    const result = await roleService.getRoleById(id);
    return defineOk({ data: result });
});