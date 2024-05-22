import BaseModel from "../base/BaseModel";
import { DataTypes, Sequelize } from "sequelize";
import sequelize from "../db";

export default class Like extends BaseModel<Like> {
  declare userId: string;
  declare articleId: string;

  static initLike(sequelize: Sequelize): typeof Like {
    const modelAttributes = {
      userId: {
        type: DataTypes.BIGINT({ length: 20 }),
        allowNull: false,
        comment: "用户ID",
      },
      articleId: {
        type: DataTypes.BIGINT({ length: 20 }),
        allowNull: false,
        comment: "文章ID",
      }
    };

    const modelOptions = {
      sequelize,
      tableName: 'like',
    };

    return super.initModel(modelAttributes, modelOptions) as typeof Like;
  }
}

// 初始化模型，调用 initLike 方法
export const likeModel = Like.initLike(sequelize) as typeof Like;
