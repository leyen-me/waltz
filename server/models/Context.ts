import BaseModel from "../base/BaseModel";
import { DataTypes, Sequelize } from "sequelize";
import sequelize from "../db";

export default class Context extends BaseModel<Context> {
    declare title: string;
    declare desc: string;

    static initContext(sequelize: Sequelize): typeof Context {
        const modelAttributes = {
            chatId: {
                type: DataTypes.BIGINT({ length: 20 }),
                allowNull: false,
                comment: "聊天ID",
            },
            context: {
                type: DataTypes.TEXT({ length: 'long' }),
                allowNull: true,
                comment: '内容',
            },
            role: {
                type: DataTypes.STRING({ length: 20 }),
                allowNull: true,
                comment: '角色',
            },
            toolName: {
                type: DataTypes.STRING({ length: 255 }),
                allowNull: true,
                comment: '工具名称',
            },
            toolParameters: {
                type: DataTypes.TEXT({ length: 'long' }),
                allowNull: true,
                comment: '工具参数',
            },
            executionTime: {
                type: DataTypes.STRING({ length: 20 }),
                allowNull: true,
                comment: '耗时',
            },
            status: {
                type: DataTypes.INTEGER({ length: 11 }),
                allowNull: true,
                comment: '状态',
            },
        };

        const modelOptions = {
            sequelize,
            tableName: 'context',
        };

        return super.initModel(modelAttributes, modelOptions) as typeof Context;
    }
}

// 初始化模型，调用 initContext 方法
export const contextModel = Context.initContext(sequelize) as typeof Context;

