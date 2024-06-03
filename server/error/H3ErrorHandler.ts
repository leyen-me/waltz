import { BaseErrorHandler } from "./BaseErrorHandler";

export class H3ErrorHandler extends BaseErrorHandler {
    canHandle(err: any): boolean {
      return err.name === 'H3Error' && err.statusCode && err.statusMessage;
    }
  
    handle(err: any): { code?: number, msg: string } {
      return { msg: "H3错误" };
    }
  }