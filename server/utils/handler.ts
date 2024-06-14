import type { EventHandler, EventHandlerRequest } from "h3";
import { defineError } from "./result";
import BaseError from "../error/BaseError";

/**
 * 全局异常拦截器，统一返回结果集
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
      // 输出错误日志到控制台
      console.error(err);

      let baseError = new BaseError();
      let code = err.code || baseError.code;
      let msg = err.message || baseError.message;

      // 如果是自定义异常，则直接抛出
      return defineError({ code, msg });
    }
  });
