import RoleService from '@/server/service/RoleService';

const roleService = new RoleService();

export default defineWrappedResponseHandler(async (event) => {
    defineHasAuthority(event, "role:delete")
    const ids: number[] = await readBody(event);

    await roleService.deleteRoles(ids);
    return defineOk({});
});