import UserService from '@/server/service/UserService';
import UserDeleteSelfError from '~/server/error/sys/user/UserDeleteSelfError';

const userService = new UserService();

export default defineWrappedResponseHandler(async (event) => {
    defineHasAuthority(event, "user:delete")

    const ids: number[] = await readBody(event);
    if (ids.includes(event.context.user.id)) {
        throw new UserDeleteSelfError()
    }
    await userService.deleteUsers(ids);
    return defineOk({});
});
