import Article from '@/server/models/Article';
import BaseService from '@/server/base/BaseService';
import { CreationAttributes } from 'sequelize';

export default class ArticleService extends BaseService<Article> {
    constructor() {
        super(Article);
    }

    async page(query: BaseQuery): Promise<{ data: Article[]; meta: any }> {
        return this.page(query);
    }

    async createArticle(articleData: CreationAttributes<Article>): Promise<{ message: string }> {
        const createdArticle = await this.create(articleData);
        if (createdArticle) {
            return { message: 'Article created successfully' };
        }
        throw Error("Failed to create article");
    }

    async updateArticle(articleId: number, articleData: Partial<CreationAttributes<Article>>): Promise<{ message: string }> {
        const options = { where: { id: articleId } };
        const affectedRows = await this.update(articleData, options);
        if (affectedRows > 0) {
            return { message: 'Article updated successfully' };
        }
        throw Error("Failed to update article")
    }

    async deleteArticles(articleIds: number[]): Promise<{ message: string }> {
        const options = { where: { id: articleIds } };
        const deletedCount = await this.delete(options);
        if (deletedCount > 0) {
            return { message: 'Articles deleted successfully' };
        }
        throw Error("Failed to delete articles");
    }

    async getArticleById(articleId: number | string): Promise<Article | null> {
        return Article.findByPk(articleId);
    }

    async getAllArticles(): Promise<Article[]> {
        return Article.findAll();
    }
}
