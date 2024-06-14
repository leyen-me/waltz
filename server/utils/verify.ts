import bcrypt from "bcrypt";
import AuthUsernameOrPasswordError from "../error/sys/auth/AuthUsernameOrPasswordError";

export const defineVerifyHash = (str: string, hashStr: string) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(str, hashStr, (err, result) => {
            if (err) {
                reject(new AuthUsernameOrPasswordError())
            } else {
                if (!result) {
                    reject(new AuthUsernameOrPasswordError())
                } else {
                    resolve(true)
                }
            }
        });
    })
}