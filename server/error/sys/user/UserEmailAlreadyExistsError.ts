export default class UserEmailAlreadyExistsError extends Error {
    constructor() {
      super("邮箱已存在");
    }
  }
  