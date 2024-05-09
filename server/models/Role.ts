import BaseModel from "../base/BaseModel";
import { DataTypes, Sequelize } from "sequelize";
import sequelize from "../db";

export default class Role extends BaseModel<Role> {
    declare roleName: string;
    declare roleDesc: string;

    public menuIdList?: number[];

    static initRole(sequelize: Sequelize): typeof Role {
        const modelAttributes = {
            roleName: {
                type: DataTypes.STRING({ length: 20 }),
                allowNull: false,
                comment: '角色名称',
            },
            roleDesc: {
                type: DataTypes.STRING({ length: 255 }),
                allowNull: true,
                comment: '角色描述',
            },
        };

        const modelOptions = {
            sequelize,
            tableName: 'role',
        };

        return super.initModel(modelAttributes, modelOptions) as typeof Role;
    }
}

// 初始化模型，调用 initRole 方法
export const roleModel = Role.initRole(sequelize) as typeof Role;


