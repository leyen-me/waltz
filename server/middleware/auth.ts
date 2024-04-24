import { defineFilterByWhiteList } from "../utils/handlerWhiteList";
import { whiteList } from "../config";

export default defineEventHandler((event) => {
  // 拦截所有api请求
  // 非api请求直接通过
  if (!event.path.startsWith("/api")) {
    return;
  }

  // 非后台管理的直接通过
  if (!event.path.startsWith("/api/admin")) {
    return;
  }

  // 如果是白名单请求，直接通过
  if (defineFilterByWhiteList(event.path, whiteList)) {
    return;
  }
  
  // /api/admin/auth/login
  // console.log("===========>", event.path);
  // event.context.auth = { user: 123 };
});
