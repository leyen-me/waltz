import bcrypt from "bcrypt";

export const defineVerifyHash = (str: string, hashStr: string, message: string) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(str, hashStr, (err, result) => {
            if (err) {
                reject(new Error(message))
            } else {
                if (!result) {
                    reject(new Error(message))
                } else {
                    resolve(true)
                }
            }
        });
    })
}