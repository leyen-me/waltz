import RoleService from '@/server/service/RoleService';

const roleService = new RoleService();

export default defineWrappedResponseHandler(async (event) => {
    hasAuthority(event, "role:page")

    const query: RoleQuery = getQuery(event);
    const result = await roleService.selectPage(query);
    return defineOk({ data: result });
});
