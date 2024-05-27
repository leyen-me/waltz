import Article from "@/server/models/Article";
import BaseService from "@/server/base/BaseService";
import { CreationAttributes, FindAndCountOptions, Op, literal } from "sequelize";
import { ArticleStatus } from "../enum";
import sequelize from "../db";
import ArticleTagService from "./ArticleTagService";
import FavoriteService from "./FavoriteService";
import CommentService from "./CommentService";
import LikeService from "./LikeService";

export default class ArticleService extends BaseService<Article> {
    private articleTagService = new ArticleTagService();
    private favoriteService = new FavoriteService();
    private commentService = new CommentService();
    private likeService = new LikeService();
    constructor() {
        super(Article);
    }

    async selectPage(query: ArticleQuery): Promise<BasePageResponse<Article>> {
        let { page, limit, order, asc, tagId, ...items } = query;
        page = Number(page);
        limit = Number(limit);

        const offset = (page - 1) * limit;

        // Filter out empty items from the query
        let filteredItems = Object.fromEntries(
            Object.entries(items).filter(([key, value]) => {
                if (value === null || value === '' || value === undefined) {
                    return false;
                }
                if (typeof value === 'number' && isNaN(value)) {
                    return false;
                }
                return true;
            })
        );


        if (tagId) {
            filteredItems = {
                ...filteredItems,
                [Op.and]: [
                    sequelize.literal(`EXISTS (SELECT 1 FROM t_article_tag at WHERE at.article_id = Article.id AND at.tag_id = ${tagId})`)
                ]
            };
        }

        // 构建查询条件
        const options: FindAndCountOptions = {
            offset,
            limit,
            order: [['published_at', asc ? 'ASC' : 'DESC']],
            where: filteredItems,
            attributes: [
                'id',
                'title',
                'cover',
                'content',
                'html',
                [sequelize.literal('(SELECT t1.title FROM t_category t1 left join t_article t2 on t1.id = t2.category_id LIMIT 1)'), 'categoryTitle'],
                [sequelize.literal('(SELECT t1.username FROM t_user t1 left join t_article t2 on t1.id = t2.author_id LIMIT 1)'), 'author'],
                'authorId',
                'categoryId',
                'publishedAt',
                'viewsCount',
                'favoritesCount',
                'likesCount',
                'commentsCount',
                'sort',
                'createdAt',
                'updatedAt'
            ],
        };


        const { rows, count } = await Article.findAndCountAll(options);

        const totalPages = Math.ceil(count / limit);

        return {
            data: rows,
            meta: {
                totalPages,
                currentPage: page,
                pageSize: limit,
                totalItems: count,
            },
        };
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
            // 如果有标签ID列表，保存或更新文章与标签的关联关系
            if (articleData.tagIdList) {
                await this.articleTagService.saveOrUpdate(createdArticle.id as number, articleData.tagIdList);
            }
            return createdArticle.id as number;
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
            // 如果有标签ID列表，保存或更新文章与标签的关联关系
            if (articleData.tagIdList) {
                await this.articleTagService.saveOrUpdate(articleId, articleData.tagIdList);
            }
        });
    }


    async updateViewsCount(articleId: number): Promise<void> {
        await Article.increment('viewsCount', { where: { id: articleId } });
    }

    async updateFavoritesCount(articleId: number): Promise<void> {
        // 计算收藏数量
        const favoritesCount = await this.favoriteService.countFavorites(articleId);
        // 更新收藏数量字段
        await Article.update({ favoritesCount }, { where: { id: articleId } });
    }

    async updateLikesCount(articleId: number): Promise<void> {
        // 计算点赞数量，这里假设点赞功能单独实现，类似于收藏功能的实现方式
        const likesCount = await this.likeService.countLikes(articleId);
        // 更新点赞数量字段
        await Article.update({ likesCount }, { where: { id: articleId } });
    }

    async updateCommentsCount(articleId: number): Promise<void> {
        // 计算评论数量，这里假设评论功能单独实现，类似于收藏功能的实现方式
        const commentsCount = await this.commentService.countCommentsByArticle(articleId);
        // 更新评论数量字段
        await Article.update({ commentsCount }, { where: { id: articleId } });
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

    async getArticleById(articleId: number): Promise<Article | null> {
        const query = `
            SELECT a.*, 
                u.username AS author,
                c.title AS categoryTitle,
                GROUP_CONCAT(DISTINCT t.title) AS tagList,
                GROUP_CONCAT(DISTINCT at.tag_id) as tagIdList,
                COUNT(DISTINCT f.id) AS favoritesCount,
                COUNT(DISTINCT l.id) AS likesCount,
                COUNT(DISTINCT cmt.id) AS commentsCount
            FROM t_article a
            JOIN t_user u ON a.author_id = u.id
            LEFT JOIN t_favorite f ON a.id = f.article_id
            LEFT JOIN t_like l ON a.id = l.article_id
            LEFT JOIN t_comment cmt ON a.id = cmt.article_id
            LEFT JOIN t_category c ON a.category_id = c.id
            LEFT JOIN t_article_tag at ON a.id = at.article_id
            LEFT JOIN t_tag t ON at.tag_id = t.id
            WHERE a.id = :articleId
            GROUP BY a.id
        `;

        const result = await sequelize.query(query, {
            replacements: { articleId },
            model: Article,
            mapToModel: true
        });

        this.updateViewsCount(articleId);

        return result.length ? result[0] : null;
    }

    async getPreviousAndNextArticles(articleId: number, categoryId: number): Promise<{ previouArticle: Article | null, nextArticle: Article | null }> {
        const currentArticle = await Article.findOne({
            where: { id: articleId, categoryId },
            attributes: ['id', 'title', 'sort', 'publishedAt']
        });

        if (!currentArticle) {
            return { previouArticle: null, nextArticle: null };
        }

        const { sort, publishedAt } = currentArticle;

        const previouArticle = await Article.findOne({
            where: {
                categoryId,
                [Op.or]: [
                    { sort: { [Op.lt]: sort } },
                    { sort: sort, publishedAt: { [Op.lt]: publishedAt } }
                ]
            },
            order: [['sort', 'DESC'], ['publishedAt', 'DESC']],
            attributes: ['id', 'title'],
            limit: 1
        }) as Article;

        const nextArticle = await Article.findOne({
            where: {
                categoryId,
                [Op.or]: [
                    { sort: { [Op.gt]: sort } },
                    { sort: sort, publishedAt: { [Op.gt]: publishedAt } }
                ]
            },
            order: [['sort', 'ASC'], ['publishedAt', 'ASC']],
            attributes: ['id', 'title'],
            limit: 1
        }) as Article;

        return { previouArticle, nextArticle };
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
