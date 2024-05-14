import RoleService from '@/server/service/RoleService';

const roleService = new RoleService();

export default defineWrappedResponseHandler(async (event) => {
    defineHasAuthority(event, "role:save")
  
    const roleData = await readBody(event);
    const result = await roleService.createRole(roleData);
    return defineOk({ data: result });
  });