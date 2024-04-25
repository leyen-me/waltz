import BaseModel from "../base/BaseModel";
import { DataTypes, Sequelize } from "sequelize";
import sequelize from "../db";

export default class Article extends BaseModel {
  declare title: string;
  declare content: string;
  declare authorId: string;

  static initArticle(sequelize: Sequelize): typeof Article {
    const modelAttributes = {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "文章标题",
      },
      content: {
        type: DataTypes.TEXT("long"),
        allowNull: false,
        comment: "文章内容",
      },
      authorId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        comment: "文章作者ID",
      },
      publishedAt: {
        type: DataTypes.DATE,
        comment: "发布时间",
      },
      status: {
        type: DataTypes.ENUM("draft", "published", "archived"),
        allowNull: false,
        comment: "文章状态",
      },
    };

    const modelOptions = {
      sequelize,
      tableName: 'article',
    };

    return super.initModel(modelAttributes, modelOptions) as typeof Article;
  }
}

// 初始化模型，调用 initArticle 方法
const articleModel = Article.initArticle(sequelize) as typeof Article;

(async () => {
  // 每次运行都重新建表
  await articleModel.sync({ force: true });
})();
