import UserService from '@/server/service/UserService';

const userService = new UserService();

export default defineWrappedResponseHandler(async (event) => {
    hasAuthority(event, "user:update")

    const { id, ...updatedUserData } = await readBody(event);
    await userService.updateUser(id, updatedUserData);
    return defineOk({});
});