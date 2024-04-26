import BaseModel from "../base/BaseModel";
import { DataTypes, Sequelize } from "sequelize";
import sequelize from "../db";

export default class Attachment extends BaseModel {
    declare title: string;
    declare url: string;
    declare ext: string;
    declare size: number;

    static initAttachment(sequelize: Sequelize): typeof Attachment {
        const modelAttributes = {
            title: {
                type: DataTypes.STRING,
                allowNull: false,
                comment: "图片标题",
            },
            url: {
                type: DataTypes.STRING,
                allowNull: false,
                comment: '图片链接',
            },
            ext: {
                type: DataTypes.STRING,
                allowNull: false,
                comment: '图片分类/扩展名',
            },
            size: {
                type: DataTypes.INTEGER,
                allowNull: false,
                comment: '图片大小',
            },
        };

        const modelOptions = {
            sequelize,
            tableName: 'attachment',
        };

        return super.initModel(modelAttributes, modelOptions) as typeof Attachment;
    }
}

// 初始化模型，调用 initAttachment 方法
const attachmentModel = Attachment.initAttachment(sequelize) as typeof Attachment;

(async () => {
    // 每次运行都重新建表
    await attachmentModel.sync({ force: false });
})();
