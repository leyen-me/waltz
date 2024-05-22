import BaseModel from "../base/BaseModel";
import { DataTypes, Sequelize } from "sequelize";
import sequelize from "../db";

export default class Comment extends BaseModel<Comment> {
  declare articleId: string;
  declare pid: string | null;
  declare userId: string;
  declare content: string;
  declare likesCount: number;

  public article?: string;
  public user?: string;
  public parentComment?: string;

  static initComment(sequelize: Sequelize): typeof Comment {
    const modelAttributes = {
      articleId: {
        type: DataTypes.BIGINT({ length: 20 }),
        allowNull: false,
        comment: "文章ID",
      },
      pid: {
        type: DataTypes.BIGINT({ length: 20 }),
        allowNull: true,
        comment: "父评论ID，允许为空",
      },
      userId: {
        type: DataTypes.BIGINT({ length: 20 }),
        allowNull: false,
        comment: "用户ID",
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
        comment: "评论内容",
      },
      likesCount: {
        type: DataTypes.INTEGER({ length: 11 }),
        defaultValue: 0,
        comment: "点赞数",
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        comment: "创建时间",
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        comment: "修改时间",
      }
    };

    const modelOptions = {
      sequelize,
      tableName: 'comment',
    };

    return super.initModel(modelAttributes, modelOptions) as typeof Comment;
  }
}

// 初始化模型，调用 initComment 方法
export const commentModel = Comment.initComment(sequelize) as typeof Comment;
