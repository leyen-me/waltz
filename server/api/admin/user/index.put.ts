import User from "@/server/models/User";

export default defineWrappedResponseHandler(async (event) => {
    const user = await readBody(event);
    if (user.password) {
        user.password = defineEncodeHash(user.password);
    }
    await User.update(
        user,
        {
            where: {
                id: user.id,
            }
        });
    return defineOk({ msg: "修改成功" })
});
