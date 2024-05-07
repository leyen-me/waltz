import RoleService from '@/server/service/RoleService';

const roleService = new RoleService();

export default defineWrappedResponseHandler(async (event) => {
    hasAuthority(event, "role:save")
  
    const roleData = await readBody(event);
    const result = await roleService.createRole(roleData);
    return defineOk({ data: result });
  });