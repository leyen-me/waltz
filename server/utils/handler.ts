import type { EventHandler, EventHandlerRequest } from "h3";
import { defineError } from "./result";

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
      console.error(err);
      
      // h3 error
      if (err.statusCode && err.statusMessage) {
        return defineError({ code: err.statusCode, msg: err.statusMessage });
      }
      // default error
      return defineError({ msg: err.message });
    }
  });
