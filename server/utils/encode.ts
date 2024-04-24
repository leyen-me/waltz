import bcrypt from "bcrypt";

export const defineEncodeHash = (str: string) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(str, salt);
}