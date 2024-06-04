import { DataTypes, Sequelize } from 'sequelize';
import BaseModel from "../base/BaseModel";
import sequelize from "../db";

export default class Attachment extends BaseModel<Attachment> {
    declare pid: number;
    declare title: string;
    declare url: string;
    declare ext: string;
    declare size: number;
    declare isFolder: whetherEnum;
    declare type: string;
    declare isFixed: whetherEnum;

    toJSON() {
        const json = super.toJSON();
        if (json.size) {
            json.size = Number((json.size / 1024 / 1024).toFixed(2));
        };
        return json;
    }

    static initAttachment(sequelize: Sequelize): typeof Attachment {
        const modelAttributes = {
            pid: {
                type: DataTypes.BIGINT({ length: 20 }),
                allowNull: true,
                comment: '父文件夹ID',
            },
            title: {
                type: DataTypes.STRING({ length: 255 }),
                allowNull: false,
                comment: "标题",
            },
            url: {
                type: DataTypes.STRING({ length: 255 }),
                allowNull: true,
                comment: '附件链接',
            },
            ext: {
                type: DataTypes.STRING({ length: 20 }),
                allowNull: true,
                comment: '附件扩展名',
            },
            size: {
                type: DataTypes.INTEGER({ length: 11 }),
                allowNull: true,
                comment: '附件大小',
            },
            isFolder: {
                type: DataTypes.TINYINT({ length: 1 }),
                allowNull: false,
                defaultValue: false,
                comment: '是否是文件夹',
            },
            type: {
                type: DataTypes.STRING({ length: 50 }),
                allowNull: true,
                comment: '附件类型',
            },
            isFixed: {
                type: DataTypes.TINYINT({ length: 1 }),
                allowNull: false,
                defaultValue: 0,
                comment: '是否固定',
            },
        };

        const modelOptions = {
            sequelize,
            tableName: 'attachment',
        };

        return super.initModel(modelAttributes, modelOptions) as typeof Attachment;
    }
}

export const attachmentModel = Attachment.initAttachment(sequelize) as typeof Attachment;
