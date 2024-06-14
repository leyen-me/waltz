export default class UserNameAlreadyExistsError extends Error {
    constructor() {
      super("用户名已存在");
    }
  }
  