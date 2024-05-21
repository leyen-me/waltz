import BaseModel from "../base/BaseModel";
import { DataTypes, Sequelize } from "sequelize";
import sequelize from "../db";

export default class Tag extends BaseModel<Tag> {
    declare title: string;
    declare desc: string;

    static initTag(sequelize: Sequelize): typeof Tag {
        const modelAttributes = {
            title: {
                type: DataTypes.STRING({ length: 255 }),
                allowNull: false,
                comment: "标签标题",
            },
            desc: {
                type: DataTypes.STRING({ length: 255 }),
                allowNull: true,
                comment: "标签标题",
            },
        };

        const modelOptions = {
            sequelize,
            tableName: 'tag',
        };

        return super.initModel(modelAttributes, modelOptions) as typeof Tag;
    }
}

// 初始化模型，调用 initTag 方法
export const tagModel = Tag.initTag(sequelize) as typeof Tag;
