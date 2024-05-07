import UserService from '@/server/service/UserService';

const userService = new UserService();

export default defineWrappedResponseHandler(async (event) => {
    hasAuthority(event, "user:delete")

    const ids: number[] = await readBody(event);

    await userService.deleteUsers(ids);
    return defineOk({});
});
