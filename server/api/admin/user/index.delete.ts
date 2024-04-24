import User from "@/server/models/User";
import { Op } from "sequelize";

export default defineWrappedResponseHandler(async (event) => {
    await User.destroy({
        where: {
            id: {
                [Op.in]: await readBody(event)
            }
        }
    });
    return defineOk({
        msg: "删除成功"
    });
});
