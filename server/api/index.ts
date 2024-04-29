import { isForce } from "../config";
import initScript from "../db/initScript";

export default defineWrappedResponseHandler(async (event) => {

});

(async () => {
    await initScript.init(isForce);
})()