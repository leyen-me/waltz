import MenuService from '@/server/service/MenuService';

const menuService = new MenuService();

export default defineWrappedResponseHandler(async (event) => {
    hasAuthority(event, "menu:save")
  
    const roleData = await readBody(event);
    const result = await menuService.createMenu(roleData);
    return defineOk({ data: result });
  });