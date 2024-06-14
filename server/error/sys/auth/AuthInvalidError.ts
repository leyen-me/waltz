import AuthBaseError from "./AuthBaseError";

export default class AuthInvalidError extends AuthBaseError {
  /**
   * 1.可能是非法的TOKEN
   * 2.签名校验错误
   * 3.过期错误
   *
   * 均会已过期，请重新登录
   */

  constructor() {
    super("登录已过期");
  }
}
