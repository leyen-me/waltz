import BaseModel from "../base/BaseModel";
import { DataTypes, Sequelize } from "sequelize";
import sequelize from "../db";
import moment from "moment";
import { ArticleStatus } from "../enum";

export default class Article extends BaseModel<Article> {
  declare categoryId: number;
  declare title: string;
  declare cover: string;
  declare content: string;
  declare authorId: string;
  declare publishedAt: string;
  declare status: string;
  declare viewsCount: number;
  declare favoritesCount: number;
  declare likesCount: number;
  declare commentsCount: number;
  declare sort: number;
  declare html: string;

  public author?: string;
  public categoryTitle?: string;
  public tagList?: number[];
  public tagIdList?: string;
  public publishedAtDetails!: ArticlePublishedAtDetail;

  toJSON() {
    const json = super.toJSON();
    if (json.publishedAt) {
      json.publishedAt = moment(json.publishedAt).format('YYYY-MM-DD HH:mm:ss')
      json.publishedAtDetails = {
        "year": moment(json.publishedAt).format('YYYY'),
        "quarter": moment(json.publishedAt).format('Q'),
        "month": {
          'number': moment(json.publishedAt).format('MM'),
          'english': moment(json.publishedAt).format('MMMM')
        },
        "week": moment(json.publishedAt).format('dddd'),
        "day": moment(json.publishedAt).format('DD'),
        "second": moment(json.publishedAt).format('X')
      };
    }
    return json;
  }

  static initArticle(sequelize: Sequelize): typeof Article {
    const modelAttributes = {
      categoryId: {
        type: DataTypes.BIGINT({ length: 20 }),
        allowNull: true,
        comment: "文章分类",
      },
      title: {
        type: DataTypes.STRING({ length: 255 }),
        allowNull: false,
        comment: "文章标题",
      },
      cover: {
        type: DataTypes.STRING({ length: 255 }),
        allowNull: true,
        comment: '文章封面',
      },
      content: {
        type: DataTypes.TEXT({ length: 'long' }),
        allowNull: false,
        comment: "文章内容",
      },
      html: {
        type: DataTypes.TEXT({ length: 'long' }),
        allowNull: false,
        comment: "文章HTML",
      },
      authorId: {
        type: DataTypes.BIGINT({ length: 20 }),
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
        type: DataTypes.INTEGER({ length: 11 }),
        defaultValue: 0,
        comment: '浏览量',
      },
      favoritesCount: {
        type: DataTypes.INTEGER({ length: 11 }),
        defaultValue: 0,
        comment: '收藏量',
      },
      likesCount: {
        type: DataTypes.INTEGER({ length: 11 }),
        defaultValue: 0,
        comment: '点赞量',
      },
      commentsCount: {
        type: DataTypes.INTEGER({ length: 11 }),
        defaultValue: 0,
        comment: '评论量',
      },
      sort: {
        type: DataTypes.INTEGER({ length: 11 }),
        defaultValue: 1,
        comment: '排序',
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