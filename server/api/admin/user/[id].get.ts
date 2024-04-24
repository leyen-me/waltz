import User from "@/server/models/User";

export default defineWrappedResponseHandler(async (event) => {
    const user = await User.findOne({
        where: {
            id: getRouterParam(event, 'id')
        }
    });
    return defineOk({ data: user });
});
