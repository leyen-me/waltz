import UserRoleService from "~/server/service/UserRoleService";

const userRoleService = new UserRoleService();

export default defineWrappedResponseHandler(async (event) => {
  event.context.user.roleIdList = userRoleService.getRoleIdList(event.context.user.id);
  return defineOk({ data: event.context.user })
});
