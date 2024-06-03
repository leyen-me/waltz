import { BaseErrorHandler } from "./BaseErrorHandler";
import { H3ErrorHandler } from "./H3ErrorHandler";
import { InvalidFileTypeErrorHandler } from "./InvalidFileTypeErrorHandler";
import { SequelizeDatabaseErrorHandler } from "./SequelizeDatabaseErrorHandler";
import { SequelizeUniqueConstraintErrorHandler } from "./SequelizeUniqueConstraintError";
import { SequelizeValidationErrorHandler } from "./SequelizeValidationErrorHandler";

class GlobalErrorHandler {
  private handlers: ErrorHandler[] = [];

  registerHandler(handler: ErrorHandler) {
    this.handlers.push(handler);
  }

  handleError(err: any): { code?: number, msg: string } {
    for (const handler of this.handlers) {
      if (handler.canHandle(err)) {
        return handler.handle(err);
      }
    }
    return new BaseErrorHandler().handle(err);
  }
}

// 初始化全局异常处理器并注册所有处理器
export const globalErrorHandler = new GlobalErrorHandler();
globalErrorHandler.registerHandler(new InvalidFileTypeErrorHandler());
globalErrorHandler.registerHandler(new H3ErrorHandler());
globalErrorHandler.registerHandler(new SequelizeValidationErrorHandler());
globalErrorHandler.registerHandler(new SequelizeUniqueConstraintErrorHandler());
globalErrorHandler.registerHandler(new SequelizeDatabaseErrorHandler());
globalErrorHandler.registerHandler(new BaseErrorHandler());
