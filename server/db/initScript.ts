import { roleModel } from "../models/Role";
import { userModel } from "../models/User";
import fs from 'fs';

export default class initScript {

    public static async init(isForce: boolean) {
        await this.initData(isForce);
    }

    private static async initData(isForce: boolean) {
        const dataFilePath = './server/config/initData.json';
        const data = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));
        const { users, roles } = data;
        const initData = [
            {
                model: userModel,
                data: users
            },
            {
                model: roleModel,
                data: roles
            }
        ];

        for (const item of initData) {
            const { model, data } = item;
            await model.sync({ force: isForce });
            for (const itemData of data) {
                // @ts-ignore
                await model.create(itemData);
            }
        }
    }
}
