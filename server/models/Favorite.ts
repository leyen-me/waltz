import BaseModel from "../base/BaseModel";
import { DataTypes, Sequelize } from "sequelize";
import sequelize from "../db";

export default class Favorite extends BaseModel<Favorite> {
  declare userId: string;
  declare articleId: string;

  static initFavorite(sequelize: Sequelize): typeof Favorite {
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
      tableName: 'favorite',
    };

    return super.initModel(modelAttributes, modelOptions) as typeof Favorite;
  }
}

// 初始化模型，调用 initFavorite 方法
export const favoriteModel = Favorite.initFavorite(sequelize) as typeof Favorite;
