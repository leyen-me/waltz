import UserService from '@/server/service/UserService';

const userService = new UserService();

export default defineWrappedResponseHandler(async (event) => {
    hasAuthority(event, "user:page")

    const query: UserQuery = getQuery(event);
    const result = await userService.selectPage(query);
    return defineOk({ data: result });
});
