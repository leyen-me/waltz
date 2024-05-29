import BaseModel from "../base/BaseModel";
import { DataTypes, Sequelize } from "sequelize";
import sequelize from "../db";

export default class Chat extends BaseModel<Chat> {
    declare title: string;
    declare userId: number;
    declare typeCode: string;

    static initChat(sequelize: Sequelize): typeof Chat {
        const modelAttributes = {
            title: {
                type: DataTypes.STRING({ length: 255 }),
                allowNull: false,
                comment: "标题",
            },
            userId: {
                type: DataTypes.BIGINT({ length: 20 }),
                allowNull: false,
                comment: "用户ID",
            },
            typeCode: {
                type: DataTypes.STRING({ length: 20 }),
                allowNull: true,
                comment: '专家类型',
            },
        };

        const modelOptions = {
            sequelize,
            tableName: 'chat',
        };

        return super.initModel(modelAttributes, modelOptions) as typeof Chat;
    }
}

// 初始化模型，调用 initChat 方法
export const chatModel = Chat.initChat(sequelize) as typeof Chat;

