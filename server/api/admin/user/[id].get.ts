import UserService from '@/server/service/UserService';
import UserRoleService from '~/server/service/UserRoleService';
const userService = new UserService();
const userRoleService = new UserRoleService();

export default defineWrappedResponseHandler(async (event) => {
    hasAuthority(event, "user:info")

    const { id } = getRouterParams(event);

    const result = await userService.getUserById(id);
    if (result){
        result.dataValues.roleIdList = await userRoleService.getRoleIdList(id as unknown as number);
    }
    return defineOk({ data: result });
});