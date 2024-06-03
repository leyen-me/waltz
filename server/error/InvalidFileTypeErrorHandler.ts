import { BaseErrorHandler } from "./BaseErrorHandler";

export class InvalidFileTypeErrorHandler extends BaseErrorHandler {
    canHandle(err: any): boolean {
        return err.name === 'InvalidFileTypeError';
    }

    handle(err: any): { code?: number, msg: string } {
        return { msg: '无效的文件类型' };
    }
}