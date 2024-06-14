export default class MenuDeleteHasChildError extends Error {
  constructor() {
    super("请先删除子菜单");
  }
}