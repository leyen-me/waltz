import User from "@/server/models/User";

export default defineEventHandler(async () => {
  const user = await User.findAll();
  console.log(user);
  return { data:user };
});
