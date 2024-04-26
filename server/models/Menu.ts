import BaseModel from "../base/BaseModel";
import { DataTypes, Sequelize } from "sequelize";
import sequelize from "../db";

export default class Menu extends BaseModel {
    declare pid: number;
    declare path: string;
    declare title: string;
    declare icon: string;
    declare level: number;
    declare authority: string;
    declare sort: number;

    static initMenu(sequelize: Sequelize): typeof Menu {
        const modelAttributes = {
            pid: {
                type: DataTypes.INTEGER,
                allowNull: false,
                comment: '父级ID',
            },
            path: {
                type: DataTypes.STRING,
                allowNull: false,
                comment: '菜单路径',
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
                comment: '菜单标题',
            },
            icon: {
                type: DataTypes.STRING,
                allowNull: true,
                comment: '菜单图标',
            },
            type: {
                type: DataTypes.ENUM("菜单", "按钮", "接口"),
                allowNull: false,
                comment: '菜单类型',
            },
            authority: {
                type: DataTypes.STRING,
                allowNull: true,
                comment: '授权标识',
            },
            sort: {
                type: DataTypes.INTEGER,
                allowNull: true,
                comment: '排序',
            }
        };

        const modelOptions = {
            sequelize,
            tableName: 'menu',
        };

        return super.initModel(modelAttributes, modelOptions) as typeof Menu;
    }
}

// 初始化模型，调用 initMenu 方法
const menuModel = Menu.initMenu(sequelize) as typeof Menu;

(async () => {
    // 每次运行都重新建表
    await menuModel.sync({ force: false });
})();
