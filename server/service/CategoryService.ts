import Category from "~/server/models/Category";
import BaseService from "@/server/base/BaseService";
import { CreationAttributes } from "sequelize";

export default class CategoryService extends BaseService<Category> {
    constructor() {
        super(Category);
    }

    async selectPage(query: CategoryQuery): Promise<BasePageResponse<Category>> {
        return await this.page(query);
    }

    async createCategory(categoryData: CreationAttributes<Category>): Promise<BaseCreateResponse> {
        const createdCategoryId = await defineTransactionWrapper(async (transaction) => {
            const createdCategory = await this.create(categoryData, { transaction });
            return createdCategory.id as number;
        });
        return createdCategoryId;
    }

    async updateCategory(categoryId: number, categoryData: Partial<CreationAttributes<Category>>): Promise<void> {
        await defineTransactionWrapper(async (transaction) => {
            await this.update(categoryData, { where: { id: categoryId }, transaction });
        });
    }

    async deleteCategories(categoryIds: number[]): Promise<void> {
        await defineTransactionWrapper(async (transaction) => {
            await this.delete({ where: { id: categoryIds }, transaction });
        });
    }

    async getCategoryById(categoryId: number): Promise<Category | null> {
        return Category.findByPk(categoryId);
    }

    async getAllCategories(): Promise<Category[]> {
        return Category.findAll();
    }
}
