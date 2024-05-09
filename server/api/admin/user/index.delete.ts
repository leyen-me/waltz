import UserService from '@/server/service/UserService';

const userService = new UserService();

export default defineWrappedResponseHandler(async (event) => {
    hasAuthority(event, "user:delete")

    const ids: number[] = await readBody(event);
    if (ids.includes(event.context.user.id)) {
        return defineError({ msg: "不能删除当前登录用户" });
    }

    await userService.deleteUsers(ids);
    return defineOk({});
});
