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
      return defineError({ msg: err.message });
    }
  });
