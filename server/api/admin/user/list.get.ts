import UserService from '@/server/service/UserService';

const userService = new UserService();

export default defineWrappedResponseHandler(async () => {
    const result = await userService.getAllUsers();
    return defineOk({ data: result });
});
