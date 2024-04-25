import BaseModel from "../base/BaseModel";
import { DataTypes, Sequelize } from "sequelize";
import sequelize from "../db";

export default class Article extends BaseModel {
  declare title: string;
  declare cover: string;
  declare content: string;
  declare authorId: string;
  declare publishedAt: Date;
  declare status: ArticleStatus;
  declare viewsCount: number;

  static initArticle(sequelize: Sequelize): typeof Article {
    const modelAttributes = {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "文章标题",
      },
      cover: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: '文章封面',
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
        allowNull: true,
        comment: "发布时间",
      },
      status: {
        type: DataTypes.ENUM("draft", "published", "archived"),
        allowNull: false,
        comment: "文章状态",
      },
      viewsCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        comment: '文章浏览量',
      }
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
  await articleModel.sync({ force: false });
})();
