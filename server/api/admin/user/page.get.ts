import UserService from '@/server/service/UserService';

const userService = new UserService();

export default defineWrappedResponseHandler(async (event) => {
    const query: UserQuery = getQuery(event);
    const result = await userService.page(query);
    return defineOk({ data: result });
});
