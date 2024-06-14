export default class AuthBaseError extends Error {
  public code: number = 401;
  constructor(message: string) {
    super(message);
  }
}
