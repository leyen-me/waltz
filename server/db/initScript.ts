import fs from 'fs';
import { userModel } from "../models/User";
import { roleModel } from "../models/Role";
import { menuModel } from "../models/Menu";
import { userRoleModel } from "../models/UserRole";
import { attachmentModel } from "../models/Attachment";
import { roleMenuModel } from "../models/RoleMenu";
import { articleModel } from '../models/Article';

export default class initScript {

    public static async init(isForce: boolean) {
        isForce && await this.initData(isForce);
    }

    private static async initData(isForce: boolean) {
        const dataFilePath = './server/config/initData.json';
        const data = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));
        const { users, roles, menus, userRoles, roleMenus } = data;
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
                model: userRoleModel,
                data: userRoles
            },
            {
                model: roleMenuModel,
                data: roleMenus
            },
            {
                model: attachmentModel,
                data: []
            },
            {
                model: articleModel,
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
