import MenuService from "~/server/service/MenuService";
import UserRoleService from "~/server/service/UserRoleService";

const userRoleService = new UserRoleService();
const menuService = new MenuService();

export default defineWrappedResponseHandler(async (event) => {
  event.context.user.dataValues.authorityList = await menuService.getUserAuthority(event.context.user);
  event.context.user.dataValues.roleIdList = await userRoleService.getRoleIdList(event.context.user.id);

  return defineOk({ data: event.context.user })
});
