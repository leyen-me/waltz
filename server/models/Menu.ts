import BaseModel from "../base/BaseModel";
import { DataTypes, Sequelize } from "sequelize";
import sequelize from "../db";

export default class Menu extends BaseModel<Menu> {
    declare pid: number;
    declare path: string;
    declare title: string;
    declare icon: string;
    declare authority: string;
    declare sort: number;

    toJSON() {
        const json = super.toJSON();
        return json;
    }

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
                type: DataTypes.ENUM("menu", "button", "interface"),
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
export const menuModel = Menu.initMenu(sequelize) as typeof Menu;