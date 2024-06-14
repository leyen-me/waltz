export default class UserDeleteSelfError extends Error {
  constructor() {
    super("不能删除自己");
  }
}
