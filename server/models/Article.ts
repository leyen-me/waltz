import BaseModel from "../base/BaseModel";
import { DataTypes, Sequelize } from "sequelize";
import sequelize from "../db";

export default class Article extends BaseModel {
  declare title: string;
  declare content: string;
  declare authorId: string;
}

Article.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
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
  },
  {
    sequelize,
    tableName: 'article',
  }
);

(async () => {
  // 每次运行都重新建表
  await Article.sync({ force: true });
})();
