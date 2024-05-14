import RoleService from '@/server/service/RoleService';

const roleService = new RoleService();


export default defineWrappedResponseHandler(async (event) => {
    defineHasAuthority(event, "role:list")

    const result = await roleService.getAllRoles();
    return defineOk({ data: result });
});
