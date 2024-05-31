class DefaultErrorHandler implements ErrorHandler {
    handle(err: any): { code?: number, msg: string } {
        return { msg: err.message };
    }
}