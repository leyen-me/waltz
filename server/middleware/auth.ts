import { secretKey, whiteList } from "../config";
import User from "../models/User";
import jwt from "jsonwebtoken";
import MenuService from "../service/MenuService";

export default defineEventHandler(async (event) => {
  // 拦截所有api请求
  // 非api请求直接通过
  if (!event.path.startsWith("/api")) {
    return;
  }

  // web的直接通过
  if (event.path.startsWith("/api/web")) {
    const token = event.headers.get("Authorization") || getQuery(event).Authorization as string;
    try {
      const decoded = jwt.verify(token, secretKey) as { id: string };
      const userId = decoded.id;
      const user = await User.findOne({
        where: {
          id: userId,
        },
      });
      event.context.user = user
    } catch (err) {
      event.context.user = null;
    }
    return;
  }

  // 如果是白名单请求，直接通过
  if (defineFilterPath(event.path, whiteList)) {
    return;
  }

  const token = event.headers.get("Authorization") || getQuery(event).Authorization as string;
  if (!token) {
    return defineError({ code: 401, msg: "请先登录" })
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
      return defineError({ code: 401, msg: "用户不存在" })
    }
    const menuService = new MenuService();

    user.authorityList = await menuService.getUserAuthority(user);
    
    event.context.user = user

  } catch (err) {
    console.log(err);
    return defineError({ code: 401, msg: "token无效" })
  }
});

