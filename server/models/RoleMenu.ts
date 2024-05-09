import BaseModel from "../base/BaseModel";
import { DataTypes, Sequelize } from "sequelize";
import sequelize from "../db";

export default class RoleMenu extends BaseModel<RoleMenu> {
    declare roleId: number;
    declare menuId: number;

    static initRoleMenu(sequelize: Sequelize): typeof RoleMenu {
        const modelAttributes = {
            roleId: {
                type: DataTypes.BIGINT({ length: 20 }),
                allowNull: false,
                comment: '角色id',
            },
            menuId: {
                type: DataTypes.BIGINT({ length: 20 }),
                allowNull: false,
                comment: '菜单id',
            },
        };

        const modelOptions = {
            sequelize,
            tableName: 'role_menu',
        };

        return super.initModel(modelAttributes, modelOptions) as typeof RoleMenu;
    }
}

// 初始化模型，调用 initRoleMenu 方法
export const roleMenuModel = RoleMenu.initRoleMenu(sequelize) as typeof RoleMenu;