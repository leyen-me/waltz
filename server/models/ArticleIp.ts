import BaseModel from "../base/BaseModel";
import { DataTypes, IndexesOptions, Sequelize } from "sequelize";
import sequelize from "../db";

export default class ArticleIp extends BaseModel<ArticleIp> {
  declare articleId: number;
  declare ip: string;

  static initArticleIp(sequelize: Sequelize): typeof ArticleIp {
    const modelAttributes = {
      articleId: {
        type: DataTypes.BIGINT({ length: 20 }),
        allowNull: false,
        comment: "文章ID",
      },
      ip: {
        type: DataTypes.STRING({ length: 255 }),
        allowNull: false,
        comment: "ip地址",
      }
    };

    const modelOptions = {
      sequelize,
      tableName: 'article_ip',
    };

    return super.initModel(modelAttributes, modelOptions) as typeof ArticleIp;
  }
}

// 初始化模型，调用 initArticleIp 方法
export const articleIpModel = ArticleIp.initArticleIp(sequelize) as typeof ArticleIp;