import RoleService from '@/server/service/RoleService';

const roleService = new RoleService();

export default defineWrappedResponseHandler(async (event) => {
    hasAuthority(event, "role:update")
    const { id, ...updatedRoleData } = await readBody(event);
    await roleService.updateRole(id, updatedRoleData);
    return defineOk({});
});