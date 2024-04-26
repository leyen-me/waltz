import User from "@/server/models/User";
import jwt from "jsonwebtoken";
import { secretKey } from "@/server/config";

export default defineWrappedResponseHandler(async (event) => {
  // 账号/密码
  const { username, password } = await readBody(event);
  
  // 判断数据库是否有该账号，有则取出
  const user = await User.findOne({
    where: {
      username,
    },
  });

  // 没有用户
  if (!user) {
    return defineError({ msg: "账号或密码错误" });
  }

  // 密码校验
  await defineVerifyHash(password, user.password,"账号或密码错误")

  // 用户信息
  const userInfo = {
    id: user.id,
  };

  // 分发Token
  const token = jwt.sign(userInfo, secretKey, {
    expiresIn: "24h",
  });

  return defineOk({
    data: {
      token
    }
  })
});
