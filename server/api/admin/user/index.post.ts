import User from "@/server/models/User";

export default defineWrappedResponseHandler(async (event) => {
  const user = await readBody(event);
  user.password = defineEncodeHash(user.password);
  await User.create(user);
  return defineOk({
    msg: "新增成功"
  });
});
