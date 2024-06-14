import AuthBaseError from "./AuthBaseError";

export default class AuthUserError extends AuthBaseError {
  constructor() {
    super("用户已注销或禁用");
  }
}
