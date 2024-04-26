import UserService from '@/server/service/UserService';

const userService = new UserService();

export default defineWrappedResponseHandler(async (event) => {
    const { id, ...updatedUserData } = await readBody(event);
    const result = await userService.updateUser(id, updatedUserData);
    return defineOk({ msg: result.message });
});