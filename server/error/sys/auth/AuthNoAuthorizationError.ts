import AuthBaseError from "./AuthBaseError";

export default class AuthNoAuthorizationError extends AuthBaseError {
  constructor() {
    super("请登录后再试");
  }
}
