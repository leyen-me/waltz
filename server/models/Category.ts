import BaseModel from "../base/BaseModel";
import { DataTypes, Sequelize } from "sequelize";
import sequelize from "../db";

export default class Category extends BaseModel<Category> {
  declare title: string;
  declare desc: string;

  static initCategory(sequelize: Sequelize): typeof Category {
    const modelAttributes = {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "分类标题",
      },
      desc: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: '分类简介',
      },
    };

    const modelOptions = {
      sequelize,
      tableName: 'category',
    };

    return super.initModel(modelAttributes, modelOptions) as typeof Category;
  }
}

// 初始化模型，调用 initCategory 方法
export const categoryModel = Category.initCategory(sequelize) as typeof Category;

