import Article from "@/server/models/Article";
import BaseService from "@/server/base/BaseService";
import { CreationAttributes, FindAndCountOptions, Op, literal } from "sequelize";
import { ArticleStatus } from "../enum";
import sequelize from "../db";

export default class ArticleService extends BaseService<Article> {
    constructor() {
        super(Article);
    }

    async selectPage(query: ArticleQuery): Promise<BasePageResponse<Article>> {
        query.order = 'published_at';
        return await this.page(query);
    }

    async createArticle(articleData: CreationAttributes<Article>): Promise<BaseCreateResponse> {
        const createdArticleId = await defineTransactionWrapper(async (transaction) => {
            if (articleData.status === ArticleStatus.values[1]) {
                articleData.publishedAt = new Date();

                // 获取文章的发布年份
                const publishedYear = new Date(articleData.publishedAt).getFullYear();

                // 获取当年发布的文章数量
                const count = await Article.count({
                    where: sequelize.where(
                        sequelize.fn('YEAR', sequelize.col('published_at')),
                        publishedYear
                    )
                });
                // 设置排序编号
                articleData.sort = count + 1;
            }
            const createdArticle = await this.create(articleData, { transaction });
            return createdArticle.id as number;
            // return (await this.create(articleData)).id as number;
        });
        return createdArticleId;
    }

    async updateArticle(articleId: number, articleData: Partial<CreationAttributes<Article>>): Promise<void> {
        await defineTransactionWrapper(async (transaction) => {
            if (articleData.status === ArticleStatus.values[1]) {
                articleData.publishedAt = new Date();

                const articleInfo = await this.getArticleById(articleId);

                if (articleInfo) {
                    if (articleInfo.status != articleData.status) {
                        // 获取文章的发布年份
                        const publishedYear = new Date(articleData.publishedAt).getFullYear();

                        // 获取当年发布的文章数量
                        const count = await Article.count({
                            where: sequelize.where(
                                sequelize.fn('YEAR', sequelize.col('published_at')),
                                publishedYear
                            )
                        });
                        // 设置排序编号
                        articleData.sort = count + 1;
                    }
                }
            }
            await this.update(articleData, { where: { id: articleId }, transaction });
        });
    }

    async deleteArticles(articleIds: number[]): Promise<void> {
        await defineTransactionWrapper(async (transaction) => {
            // 查询待删除文章的年份和排序编号
            const articlesToDelete = await Article.findAll({ attributes: ['id', 'publishedAt', 'sort'], where: { id: articleIds }, transaction });

            // 删除文章
            await this.delete({ where: { id: articleIds }, transaction });

            // 更新后续文章的排序编号
            for (const article of articlesToDelete) {
                const year = new Date(article.publishedAt).getFullYear();

                // 更新后续文章的排序编号
                await Article.update({ sort: sequelize.literal('sort - 1') }, {
                    where: {
                        publishedAt: {
                            [Op.gte]: new Date(`${year}-01-01`),
                            [Op.lt]: new Date(`${year + 1}-01-01`)
                        },
                        status: ArticleStatus.values[1], // 只更新状态为已发布的文章
                        sort: { [Op.gt]: article.sort }, // 只更新排序编号大于当前文章的文章
                    },
                    transaction
                });
            }
        });
    }

    async getArticleById(articleId: number | string): Promise<Article | null> {
        const query = `
            SELECT a.*, u.username as author
            FROM t_article a
            JOIN t_user u ON a.author_id = u.id
            WHERE A.id = :articleId
        `;

        const result = await sequelize.query(query, {
            replacements: { articleId },
            model: Article,
            mapToModel: true
        });

        return result.length ? result[0] : null;
    }

    async getAllArticles(title: string): Promise<Article[]> {

        // 构建全文搜索查询条件
        const condition = literal('MATCH(title,content) AGAINST(:title IN BOOLEAN MODE)');

        // 执行 findAll 方法并传递查询条件
        const articles = await Article.findAll({
            where: condition,
            replacements: { title: `${title}` },
        });
        return articles;
    }
}
