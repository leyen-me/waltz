import AuthBaseError from "./AuthBaseError";

export default class AuthUsernameOrPasswordError extends AuthBaseError {
  constructor() {
    super("账号或密码错误");
    this.code = 500;
  }
}
