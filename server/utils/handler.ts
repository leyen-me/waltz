import type { EventHandler, EventHandlerRequest } from "h3";

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
      const res: MResponse = {
        code: 200,
        data: response,
        msg: "ok",
      };
      return res;
    } catch (err: any) {
      const res: MResponse = {
        code: 500,
        data: null,
        msg: err.message,
      };
      return res;
    }
  });
