import User from "@/server/models/User";

export default defineWrappedResponseHandler(async () => {
  const user = await User.create();
  return {
    id: user.id,
  };
});
