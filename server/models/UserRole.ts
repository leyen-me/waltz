import BaseModel from "../base/BaseModel";
import { DataTypes, Sequelize } from "sequelize";
import sequelize from "../db";

export default class UserRole extends BaseModel<UserRole> {
    declare userId: number;
    declare roleId: number;


    static initUserRole(sequelize: Sequelize): typeof UserRole {
        const modelAttributes = {
            userId: {
                type: DataTypes.BIGINT({ length: 20 }),
                allowNull: false,
                comment: '用户id',
            },
            roleId: {
                type: DataTypes.BIGINT({ length: 20 }),
                allowNull: false,
                comment: '角色id',
            },
        };

        const modelOptions = {
            sequelize,
            tableName: 'user_role',
        };

        return super.initModel(modelAttributes, modelOptions) as typeof UserRole;
    }
}

// 初始化模型，调用 initUserRole 方法
export const userRoleModel = UserRole.initUserRole(sequelize) as typeof UserRole;
