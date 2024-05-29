import BaseModel from "../base/BaseModel";
import { DataTypes, Sequelize } from "sequelize";
import sequelize from "../db";

export default class Repository extends BaseModel<Repository> {
    declare title: string;
    declare remark: string;

    static initRepository(sequelize: Sequelize): typeof Repository {
        const modelAttributes = {
            title: {
                type: DataTypes.STRING({ length: 255 }),
                allowNull: false,
                comment: '题库名称',
            },
            remark: {
                type: DataTypes.STRING({ length: 255 }),
                allowNull: true,
                comment: '题库备注',
            },
        };

        const modelOptions = {
            sequelize,
            tableName: 'repository',
        };

        return super.initModel(modelAttributes, modelOptions) as typeof Repository;
    }
}

// 初始化模型，调用 initRepository 方法
export const repositorynModel = Repository.initRepository(sequelize) as typeof Repository;


