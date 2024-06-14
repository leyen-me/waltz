import User from "@/server/models/User";
import jwt from "jsonwebtoken";
import { secretKey } from "@/server/config";
import AuthNoAuthorizationError from "~/server/error/sys/auth/AuthUsernameOrPasswordError";

export default defineWrappedResponseHandler(async (event) => {
  // 账号/密码
  const { username, password }: LoginRequest = await readBody(event);

  // 判断数据库是否有该账号，有则取出
  const user = await User.findOne({
    where: {
      username,
    },
  });

  // 没有用户
  if (!user) {
    throw new AuthNoAuthorizationError()
  }

  // 密码校验
  await defineVerifyHash(password, user.password);

  // 用户信息
  const userInfo = {
    id: user.id,
  };
  
  // 分发Token
  const token = jwt.sign(userInfo, secretKey, {
    expiresIn: "24h",
  });

  // 返回
  const res: LoginResponse = {
    token
  };

  return defineOk({
    data: res,
  });
});
