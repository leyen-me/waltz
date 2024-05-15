import fs from 'fs';
import { userModel } from "../models/User";
import { roleModel } from "../models/Role";
import { menuModel } from "../models/Menu";
import { userRoleModel } from "../models/UserRole";
import { attachmentModel } from "../models/Attachment";
import { roleMenuModel } from "../models/RoleMenu";
import { articleModel } from '../models/Article';
import { articleIpModel } from '../models/ArticleIp';
import { siteConfigModel } from '../models/SiteConfig';
import { dictDataModel } from '../models/DictData';
import { dictTypeModel } from '../models/DictType';
import { ModelStatic } from 'sequelize';

export default class initScript {

    public static async init(isForce: boolean) {
        isForce && await this.initData(isForce);
    }

    private static async initData(isForce: boolean) {
        const dataFilePath = './server/config/initData.json';
        const data = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));

        const initModels: { model: ModelStatic<any>, data: any[] }[] = [
            { model: userModel, data: data.users },
            { model: roleModel, data: data.roles },
            { model: menuModel, data: data.menus },
            { model: userRoleModel, data: data.userRoles },
            { model: roleMenuModel, data: data.roleMenus },
            { model: attachmentModel, data: [] },
            { model: articleModel, data: [] },
            { model: articleIpModel, data: [] },
            { model: siteConfigModel, data: data.siteConfigs },
            { model: dictDataModel, data: [] },
            { model: dictTypeModel, data: [] }
        ];

        await Promise.all(initModels.map(async ({ model, data }) => {
            await model.sync({ force: isForce });
            await model.bulkCreate(data);
        }));
    }
}
