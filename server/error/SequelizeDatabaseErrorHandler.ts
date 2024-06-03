import { BaseErrorHandler } from "./BaseErrorHandler";

export class SequelizeDatabaseErrorHandler extends BaseErrorHandler {
    canHandle(err: any): boolean {
      return err.name === 'SequelizeDatabaseError';
    }
  
    handle(err: any): { code?: number, msg: string } {
      return { msg: '数据库错误' };
    }
  }
  