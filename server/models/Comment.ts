import BaseModel from "../base/BaseModel";
import { DataTypes, Sequelize } from "sequelize";
import sequelize from "../db";

export default class Comment extends BaseModel<Comment> {
  declare articleId: number;
  declare pid: number;
  declare userId: number;
  declare content: string;
  declare likesCount: number;
  declare status: CommentStatusEnum;

  public articleTitle?: string;
  public username?: string;
  public parentUsername?: string;
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
        comment: "父评论ID,允许为空",
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
      status: {
        type: DataTypes.ENUM({ values: ["nopass", "ing", "pass"] }),
        allowNull: true,
        comment: '状态',
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
