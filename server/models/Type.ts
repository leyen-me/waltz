import BaseModel from "../base/BaseModel";
import { DataTypes, Sequelize } from "sequelize";
import sequelize from "../db";

export default class Type extends BaseModel<Type> {
    declare userId: number;
    declare name: string;
    declare code: string;

    static initType(sequelize: Sequelize): typeof Type {
        const modelAttributes = {
            userId: {
                type: DataTypes.BIGINT({ length: 20 }),
                allowNull: false,
                comment: "用户ID",
            },
            name: {
                type: DataTypes.STRING({ length: 255 }),
                allowNull: true,
                comment: '模型名称',
            },
            code: {
                type: DataTypes.STRING({ length: 255 }),
                allowNull: true,
                comment: '模型编码',
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

