import UserService from '@/server/service/UserService';

const userService = new UserService();

export default defineWrappedResponseHandler(async (event) => {
    defineHasAuthority(event, "user:list")

    const result = await userService.getAllUsers();
    return defineOk({ data: result });
});
