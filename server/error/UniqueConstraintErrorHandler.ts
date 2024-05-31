class UniqueConstraintErrorHandler implements ErrorHandler {
    handle(err: any): { code?: number, msg: string } {
        return { msg: '唯一约束错误: ' + err.errors.map((e: any) => e.message).join(', ') };
    }
}