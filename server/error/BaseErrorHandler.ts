export class BaseErrorHandler implements ErrorHandler {
    canHandle(err: any): boolean {
        return false;
    }

    handle(err: any): { code?: number, msg: string } {
        return { msg: '服务器异常,请联系管理员处理' };
    }
}