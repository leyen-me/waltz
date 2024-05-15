import BaseModel from "../base/BaseModel";
import { DataTypes, Sequelize } from "sequelize";
import sequelize from "../db";

export default class DictType extends BaseModel<DictType> {
    declare dictType: string;
    declare dictName: string;
    declare remark: string;
    declare sort: number;
    declare dataList: DictData[];

    static initDictType(sequelize: Sequelize): typeof DictType {
        const modelAttributes = {
            dictType: {
                type: DataTypes.STRING({ length: 255 }),
                allowNull: false,
                comment: "字典类型",
            },
            dictName: {
                type: DataTypes.STRING({ length: 255 }),
                allowNull: false,
                comment: "字典名称",
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
            tableName: 'dict_type',
        };

        return super.initModel(modelAttributes, modelOptions) as typeof DictType;
    }
}

// 初始化模型，调用 initDictType 方法
export const dictTypeModel = DictType.initDictType(sequelize) as typeof DictType;