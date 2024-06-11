import BaseModel from "../base/BaseModel";
import { DataTypes, Sequelize } from "sequelize";
import sequelize from "../db";

export default class ArticleRole extends BaseModel<ArticleRole> {
    declare articleId: number;
    declare roleId: number;


    static initArticleRole(sequelize: Sequelize): typeof ArticleRole {
        const modelAttributes = {
            articleId: {
                type: DataTypes.BIGINT({ length: 20 }),
                allowNull: false,
                comment: '文章id',
            },
            roleId: {
                type: DataTypes.BIGINT({ length: 20 }),
                allowNull: false,
                comment: '角色id',
            },
        };

        const modelOptions = {
            sequelize,
            tableName: 'article_role',
        };

        return super.initModel(modelAttributes, modelOptions) as typeof ArticleRole;
    }
}

// 初始化模型，调用 initArticleRole 方法
export const articleRoleModel = ArticleRole.initArticleRole(sequelize) as typeof ArticleRole;
