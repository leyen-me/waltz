interface ErrorHandler {
    handle(err: any): { code?: number, msg: string };
}
