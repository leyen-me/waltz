import { SequelizeDatabaseErrorHandler } from "./SequelizeDatabaseErrorHandler";

export class SequelizeValidationErrorHandler extends SequelizeDatabaseErrorHandler {
    canHandle(err: any): boolean {
        return err.message === 'SequelizeValidationError';
    }

    handle(err: any): { code?: number, msg: string } {
        const messages = err.errors.map((e: any) => e.message).join(', ');
        return { msg: `验证错误: ${messages}` };
    }
}