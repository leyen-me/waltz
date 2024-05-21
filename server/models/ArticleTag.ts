import BaseModel from "../base/BaseModel";
import { DataTypes, Sequelize } from "sequelize";
import sequelize from "../db";

export class ArticleTag extends BaseModel<ArticleTag> {
    declare articleId: number;
    declare tagId: number;
  
    static initArticleTag(sequelize: Sequelize): typeof ArticleTag {
      const modelAttributes = {
        articleId: {
          type: DataTypes.BIGINT({ length: 20 }),
          allowNull: false,
          references: {
            model: 'article',
            key: 'id'
          },
          comment: "文章ID",
        },
        tagId: {
          type: DataTypes.BIGINT({ length: 20 }),
          allowNull: false,
          references: {
            model: 'tag',
            key: 'id'
          },
          comment: "标签ID",
        },
      };
  
      const modelOptions = {
        sequelize,
        tableName: 'article_tag',
      };
  
      return super.initModel(modelAttributes, modelOptions) as typeof ArticleTag;
    }
  }
  
  // 初始化中间模型，调用 initArticleTag 方法
  export const articleTagModel = ArticleTag.initArticleTag(sequelize) as typeof ArticleTag;