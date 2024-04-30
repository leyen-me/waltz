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

  // 非后台管理的直接通过
  if (!event.path.startsWith("/api/admin")) {
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

    // 把user放到上下文
    event.context.user = user
    // console.log(event.context.user);

    // console.log(event.path, event.context.user.authorityList);
    
    // if (!defineFilterPath(event.path, event.context.user.authorityList)) {
    //   return defineError({ code: 403, msg: "权限不足" });
    // }

    // 检查用户权限
    // if (!checkUserPermission(event.context.user.authorityList, event.path)) {
    //   return defineError({ code: 403, msg: "权限不足" });
    // }

  } catch (err) {
    console.error(err);
    return defineError({ code: 401, msg: "token无效" })
  }
});

// 检查用户权限
// function checkUserPermission(authorityList: string[], path: string): boolean {
//   console.log(path);

//   return authorityList.includes(path);
// }
