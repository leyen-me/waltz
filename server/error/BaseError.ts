export default class BaseError extends Error {
  public code: number = 500;
  constructor() {
    super("服务器内部错误");
  }
}
