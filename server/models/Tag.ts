import BaseModel from "../base/BaseModel";
import { DataTypes, Sequelize } from "sequelize";
import sequelize from "../db";

export default class Tag extends BaseModel<Tag> {
    declare categoryId: number;
    declare title: string;

    static initTag(sequelize: Sequelize): typeof Tag {
        const modelAttributes = {
            categoryId: {
                type: DataTypes.BIGINT,
                allowNull: false,
                comment: "分类id",
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
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
