import BaseModel from "../base/BaseModel";
import { DataTypes, Sequelize } from "sequelize";
import sequelize from "../db";

export default class Type extends BaseModel<Type> {
    declare title: string;
    declare desc: string;

    static initType(sequelize: Sequelize): typeof Type {
        const modelAttributes = {
            userId: {
                type: DataTypes.BIGINT,
                allowNull: false,
                comment: "用户ID",
            },
            name: {
                type: DataTypes.STRING({ length: 20 }),
                allowNull: true,
                comment: '模型名称',
            },
            code: {
                type: DataTypes.STRING({ length: 20 }),
                allowNull: true,
                comment: 'agent name',
            },
        };

        const modelOptions = {
            sequelize,
            tableName: 'type',
        };

        return super.initModel(modelAttributes, modelOptions) as typeof Type;
    }
}

// 初始化模型，调用 initType 方法
export const typeModel = Type.initType(sequelize) as typeof Type;

