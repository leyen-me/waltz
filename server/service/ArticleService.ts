import Article from "@/server/models/Article";
import BaseService from "@/server/base/BaseService";
import { CreationAttributes } from "sequelize";
import { ArticleStatus } from "../enum";

export default class ArticleService extends BaseService<Article> {
    constructor() {
        super(Article);
    }

    async selectPage(query: ArticleQuery): Promise<BasePageResponse<Article>> {
        return this.page(query);
    }

    async createArticle(articleData: CreationAttributes<Article>): Promise<BaseCreateResponse> {
        if (articleData.status === ArticleStatus.values[1]) {
            articleData.publishedAt = new Date();
        }
        return (await this.create(articleData)).id as number;
    }

    async updateArticle(articleId: number, articleData: Partial<CreationAttributes<Article>>): Promise<void> {
        if (articleData.status === ArticleStatus.values[1]) {
            articleData.publishedAt = new Date();
        }
        await this.update(articleData, { where: { id: articleId } });
    }

    async deleteArticles(articleIds: number[]): Promise<void> {
        await this.delete({ where: { id: articleIds } });
    }

    async getArticleById(articleId: number | string): Promise<Article | null> {
        return await Article.findByPk(articleId);
    }

    async getAllArticles(): Promise<Article[]> {
        return await Article.findAll();
    }
}
