import User from "@/server/models/User";

export default defineEventHandler(async () => {
  const user = await User.create();
  return {
    id: user.id,
  };
});
