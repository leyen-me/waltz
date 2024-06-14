export default class UserAlreadyExistsError extends Error {
  constructor() {
    super("用户已存在");
  }
}
