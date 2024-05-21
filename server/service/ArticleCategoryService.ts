import ArticleCategory from "~/server/models/Category";
import BaseService from "@/server/base/BaseService";
import { CreationAttributes } from "sequelize";
import sequelize from "../db";

export default class ArticleCategoryService extends BaseService<ArticleCategory> {
    constructor() {
        super(ArticleCategory);
    }

    async selectPage(query: ArticleCategoryQuery): Promise<BasePageResponse<ArticleCategory>> {
        return await this.page(query);
    }

    async createCategory(categoryData: CreationAttributes<ArticleCategory>): Promise<BaseCreateResponse> {
        const createdCategoryId = await defineTransactionWrapper(async (transaction) => {
            const createdCategory = await this.create(categoryData, { transaction });
            return createdCategory.id as number;
        });
        return createdCategoryId;
    }

    async updateCategory(categoryId: number, categoryData: Partial<CreationAttributes<ArticleCategory>>): Promise<void> {
        await defineTransactionWrapper(async (transaction) => {
            await this.update(categoryData, { where: { id: categoryId }, transaction });
        });
    }

    async deleteCategories(categoryIds: number[]): Promise<void> {
        await defineTransactionWrapper(async (transaction) => {
            await this.delete({ where: { id: categoryIds }, transaction });
        });
    }

    async getCategoryById(categoryId: number | string): Promise<ArticleCategory | null> {
        const query = `
            SELECT c.*
            FROM t_article_category c
            WHERE c.id = :categoryId
        `;

        const result = await sequelize.query(query, {
            replacements: { categoryId },
            model: ArticleCategory,
            mapToModel: true
        });

        return result.length ? result[0] : null;
    }

    async getAllCategories(): Promise<ArticleCategory[]> {
        return ArticleCategory.findAll();
    }
}
