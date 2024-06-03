interface ErrorHandler {
    canHandle(err: any): boolean;
    handle(err: any): { code?: number, msg: string };
}
