import UserService from '@/server/service/UserService';

const userService = new UserService();

export default defineWrappedResponseHandler(async (event) => {
  const userData = await readBody(event);
  userData.roleIdList = [2];
  const result = await userService.createUser(userData);
  return defineOk({ data: result });
});