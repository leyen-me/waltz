import User from "@/server/models/User";

export default defineWrappedResponseHandler(async (event) => {
  const user = await User.create(await readBody(event));
  return {
    id: user.id,
  };
});
