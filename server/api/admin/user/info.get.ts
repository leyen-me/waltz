import User from "@/server/models/User";
import jwt from "jsonwebtoken";
import { secretKey } from "@/server/config";

export default defineWrappedResponseHandler(async (event) => {
  const token = event.headers.get("Authorization");
  if (!token) {
    throw Error("token为空");
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
      throw Error("用户已被删除");
    }
    return user?.toJSON();
  } catch (err) {
    throw Error("token无效");
  }
  return {};
});
