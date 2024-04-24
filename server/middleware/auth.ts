import { secretKey, whiteList } from "../config";
import User from "../models/User";
import jwt from "jsonwebtoken";

export default defineEventHandler(async (event) => {
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

  const token = event.headers.get("Authorization");
  if (!token) {
    return defineError({ msg: "token为空" })
  }

  try {
    const decoded = jwt.verify(token, secretKey) as { id: string };
    const userId = decoded.id;
    const user = await User.findOne({
      where: {
        id: userId,
      },
    });
    if (!user) {
      return defineError({ msg: "用户已被删除" })
    }

    // 把user放到上下文
    event.context.user = user
  } catch (err) {
    return defineError({ msg: "token无效" })
  }
});
