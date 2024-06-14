import { secretKey, whiteList } from "../config";
import User from "../models/User";
import jwt from "jsonwebtoken";
import MenuService from "../service/MenuService";
import AuthNoAuthorizationError from "../error/sys/auth/AuthNoAuthorizationError";
import AuthUserError from "../error/sys/auth/AuthUserError";
import AuthInvalidError from "../error/sys/auth/AuthInvalidError";

export default defineWrappedResponseHandler(async (event) => {
  // 拦截所有api请求
  // 非api请求直接通过
  if (!event.path.startsWith("/api")) {
    return;
  }

  // web的直接通过
  if (event.path.startsWith("/api/web")) {
    const token =
      event.headers.get("Authorization") ||
      (getQuery(event).Authorization as string);
    try {
      const decoded = jwt.verify(token, secretKey) as { id: string };
      const userId = decoded.id;
      const user = await User.findOne({
        where: {
          id: userId,
        },
      });
      event.context.user = user;
    } catch (err) {
      event.context.user = null;
    }
    return;
  }

  // 如果是白名单请求，直接通过
  if (defineFilterPath(event.path, whiteList)) {
    return;
  }

  const token =
    event.headers.get("Authorization") ||
    (getQuery(event).Authorization as string);
  if (!token) {
    throw new AuthNoAuthorizationError();
  }

  try {
    // 解析TOKEN
    const decoded = jwt.verify(token, secretKey) as { id: string };
    const userId = decoded.id;
    const user = await User.findOne({
      where: {
        id: userId,
      },
    });

    // 认证
    if (!user) {
      throw new AuthUserError();
    }

    // 权限
    const menuService = new MenuService();
    user.authorityList = await menuService.getUserAuthority(user);
    event.context.user = user;
  } catch (err) {
    throw new AuthInvalidError();
  }
});
