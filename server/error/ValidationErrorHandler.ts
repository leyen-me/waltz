class ValidationErrorHandler implements ErrorHandler {
    handle(err: any): { code?: number, msg: string } {
        return { msg: '验证错误: ' + err.errors.map((e: any) => e.message).join(', ') };
    }
}