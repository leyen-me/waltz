import UserService from '@/server/service/UserService';
const userService = new UserService();

export default defineWrappedResponseHandler(async (event) => {
    hasAuthority(event, "user:info")

    const { id } = getRouterParams(event);

    const result = await userService.getUserById(id);
    return defineOk({ data: result });
});