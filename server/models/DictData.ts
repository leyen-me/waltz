import BaseModel from "../base/BaseModel";
import { DataTypes, Sequelize } from "sequelize";
import sequelize from "../db";

export default class DictData extends BaseModel<DictData> {
    declare typeId: number;
    declare label: string;
    declare value: string;
    declare labelClass: string;
    declare remark: string;
    declare sort: number;

    static initDictData(sequelize: Sequelize): typeof DictData {
        const modelAttributes = {
            typeId: {
                type: DataTypes.BIGINT({ length: 20 }),
                allowNull: false,
                comment: "字典类型ID",
            },
            label: {
                type: DataTypes.STRING({ length: 255 }),
                allowNull: false,
                comment: "字典标签",
            },
            value: {
                type: DataTypes.STRING({ length: 255 }),
                allowNull: false,
                comment: "字典值",
            },
            labelClass: {
                type: DataTypes.STRING({ length: 20 }),
                allowNull: true,
                comment: "标签样式",
            },
            remark: {
                type: DataTypes.STRING({ length: 255 }),
                allowNull: true,
                comment: "备注",
            },
            sort: {
                type: DataTypes.INTEGER({ length: 11 }),
                comment: '排序',
            }
        };

        const modelOptions = {
            sequelize,
            tableName: 'dict_data',
        };

        return super.initModel(modelAttributes, modelOptions) as typeof DictData;
    }
}

// 初始化模型，调用 initDictData 方法
export const dictDataModel = DictData.initDictData(sequelize) as typeof DictData;