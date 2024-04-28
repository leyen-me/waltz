import { isForceDbData } from "../config";
import initScript from "../db/initScript";

export default defineWrappedResponseHandler(async (event) => {

});

(async () => {
    // 第一次创建需要初始化数据库，运行完后及时更换为isForceDbData[1]
    await initScript.init(isForceDbData[0]);
})()