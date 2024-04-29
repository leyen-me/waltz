import BaseModel from "../base/BaseModel";
import { DataTypes, Sequelize } from "sequelize";
import sequelize from "../db";
import moment from "moment";
import { ArticleStatus } from "../enum";

export default class Article extends BaseModel<Article> {
  declare title: string;
  declare cover: string;
  declare content: string;
  declare authorId: string;
  declare publishedAt: string;
  declare status: string;
  declare viewsCount: number;

  toJSON() {
    const json = super.toJSON();
    json.publishedAt = moment(json.publishedAt).format('YYYY-MM-DD HH:mm:ss');
    return json;
  }

  static initArticle(sequelize: Sequelize): typeof Article {
    const modelAttributes = {
      categoryId: {
        type: DataTypes.BIGINT,
        allowNull: true,
        comment: "文章分类",
      },
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
        type: ArticleStatus,
        allowNull: false,
        defaultValue: ArticleStatus.values[0],
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
export const articleModel = Article.initArticle(sequelize) as typeof Article;