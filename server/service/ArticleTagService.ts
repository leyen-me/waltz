import { ArticleTag } from '~/server/models/ArticleTag';
import BaseService from '@/server/base/BaseService';
import { Op } from 'sequelize';

export default class ArticleTagService extends BaseService<ArticleTag> {
    constructor() {
        super(ArticleTag);
    }

    // 保存或更新文章和标签的关联关系
    async saveOrUpdate(articleId: number, tagIdList: number[]): Promise<void> {
        await defineTransactionWrapper(async (transaction) => {
            // 查询数据库中已存在的文章标签关系
            const existingTagIds = await this.getTagIdList(articleId);

            // 需要新增的标签ID列表
            const insertTagIds = tagIdList.filter(tagId => !existingTagIds.includes(tagId));

            // 需要删除的标签ID列表
            const deleteTagIds = existingTagIds.filter(tagId => !tagIdList.includes(tagId));

            // 批量新增文章标签关系
            await ArticleTag.bulkCreate(insertTagIds.map(tagId => ({
                articleId,
                tagId
            })), { transaction });

            // 删除文章标签关系
            await ArticleTag.destroy({
                where: {
                    articleId,
                    tagId: {
                        [Op.in]: deleteTagIds
                    }
                },
                transaction
            });
        });
    }

    // 根据文章ID，获取标签ID列表
    async getTagIdList(articleId: number): Promise<number[]> {
        const articleTags = await ArticleTag.findAll({
            where: {
                articleId
            },
            attributes: ['tagId']
        });
        return articleTags.map(articleTag => articleTag.tagId);
    }

    // 根据文章ID列表，删除文章标签关系
    async deleteByArticleIdList(articleIdList: number[]): Promise<void> {
        await ArticleTag.destroy({
            where: {
                articleId: {
                    [Op.in]: articleIdList
                }
            }
        });
    }

    // 根据标签ID，删除文章标签关系
    async deleteByTagId(tagId: number): Promise<void> {
        await ArticleTag.destroy({
            where: {
                tagId
            }
        });
    }
}
