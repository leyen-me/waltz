import type { EventHandler, EventHandlerRequest } from "h3";
import { defineError } from "./result";

// 实现不同类型错误的处理程序
class DefaultErrorHandler implements ErrorHandler {
  canHandle(err: any): boolean {
    return true; 
  }

  handle(err: any): { code?: number, msg: string } {
    return { msg: err.message };
  }
}

class H3ErrorHandler implements ErrorHandler {
  canHandle(err: any): boolean {
    return err.name === 'H3Error' && err.statusCode && err.statusMessage;
  }

  handle(err: any): { code?: number, msg: string } {
    return { code: err.statusCode, msg: err.statusMessage };
  }
}

class InvalidFileTypeErrorHandler implements ErrorHandler {
  canHandle(err: any): boolean {
    return err.name === 'InvalidFileTypeError';
  }

  handle(err: any): { code?: number, msg: string } {
    return { msg: '无效的文件类型' };
  }
}


class SequelizeErrorHandler implements ErrorHandler {
  canHandle(err: any): boolean {
    return err.name === 'SequelizeDatabaseError';
  }

  handle(err: any): { code?: number, msg: string } {
    // 进一步验证错误类型
    let msg: string;
    switch (err.operation) {
      case 'create':
        msg = '创建数据失败：' + err.message;
        break;
      case 'delete':
        msg = '删除数据失败：' + err.message;
        break;
      case 'update':
        msg = '更新数据失败：' + err.message;
        break;
      case 'read':
        msg = '读取数据失败：' + err.message;
        break;
      // 添加其他 Sequelize 操作类型的处理逻辑
      default:
        msg = '数据库错误：' + err.message;
        break;
    }
    return { msg };
  }
}

// 定义错误处理程序接口
interface ErrorHandler {
  canHandle(err: any): boolean;
  handle(err: any): { code?: number, msg: string };
}


// 创建错误处理程序映射
const errorHandlers: ErrorHandler[] = [
  new InvalidFileTypeErrorHandler(),
  new H3ErrorHandler(),
  new SequelizeErrorHandler(),
  new DefaultErrorHandler()
];

/**
 * 全局异常处理，统一返回结果集
 * @param handler
 * @returns
 */
export const defineWrappedResponseHandler = <T extends EventHandlerRequest, D>(
  handler: EventHandler<T, D>
): EventHandler<T, D> =>
  defineEventHandler<T>(async (event) => {
    try {
      const response = await handler(event);
      return response;
    } catch (err: any) {
      // console.error(err);

      // 寻找适合的错误处理程序
      const selectedHandler = errorHandlers.find(handler => handler.canHandle(err));

      // 如果找到了适合的错误处理程序，则使用它处理错误，否则使用默认错误处理程序
      if (selectedHandler) {
        return defineError(selectedHandler.handle(err));
      } else {
        return defineError({ msg: err.message });
      }
    }
  });
