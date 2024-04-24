import User from "@/server/models/User";

export default defineWrappedResponseHandler(async () => {
  const user = await User.findAll();
  console.log(user);
  return { data:user };
});
