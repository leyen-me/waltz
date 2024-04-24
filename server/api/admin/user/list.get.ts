import User from "@/server/models/User";

export default defineWrappedResponseHandler(async () => {
  const user = await User.findAll();
  return defineOk({ data: user });
});
