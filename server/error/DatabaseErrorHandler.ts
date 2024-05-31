class DatabaseErrorHandler implements ErrorHandler {
    handle(err: any): { code?: number, msg: string } {
        return { msg: '数据库错误: ' + err.message };
    }
}