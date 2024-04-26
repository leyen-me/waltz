import BaseModel from "../base/BaseModel";
import { DataTypes, Sequelize } from "sequelize";
import sequelize from "../db";

export default class UserRole extends BaseModel {
    declare userId: number;
    declare roleId: number;


    static initUserRole(sequelize: Sequelize): typeof UserRole {
        const modelAttributes = {
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                comment: '用户id',
            },
            roleId: {
                type: DataTypes.INTEGER,
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
const userRoleModel = UserRole.initUserRole(sequelize) as typeof UserRole;

(async () => {
    // 每次运行都重新建表
    await userRoleModel.sync({ force: false });
})();
