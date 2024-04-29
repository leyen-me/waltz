import { attachmentModel } from "../models/Attachment";
import { menuModel } from "../models/Menu";
import { roleModel } from "../models/Role";
import { userModel } from "../models/User";
import fs from 'fs';

export default class initScript {

    public static async init(isForce: boolean) {
        isForce && await this.initData(isForce);
    }

    private static async initData(isForce: boolean) {
        const dataFilePath = './server/config/initData.json';
        const data = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));
        const { users, roles, menus } = data;
        const initData = [
            {
                model: userModel,
                data: users
            },
            {
                model: roleModel,
                data: roles
            },
            {
                model: menuModel,
                data: menus
            },
            {
                model: attachmentModel,
                data: []
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
