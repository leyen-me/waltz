import ArticleRole from '@/server/models/ArticleRole';
import BaseService from '@/server/base/BaseService';
import { Op } from 'sequelize';

export default class ArticleRoleService extends BaseService<ArticleRole> {
    constructor() {
        super(ArticleRole);
    }

    // 保存或更新文章和角色的关联关系
    async saveOrUpdate(articleId: number, roleIdList: number[]): Promise<void> {
        await defineTransactionWrapper(async (transaction) => {
            // 查询数据库中已存在的文章角色关系
            const existingRoleIds = await this.getRoleIdList(articleId);

            // 需要新增的角色ID列表
            const insertRoleIds = roleIdList.filter(roleId => !existingRoleIds.includes(roleId));

            // 需要删除的角色ID列表
            const deleteRoleIds = existingRoleIds.filter(roleId => !roleIdList.includes(roleId));

            // 批量新增文章角色关系
            await ArticleRole.bulkCreate(insertRoleIds.map(roleId => ({
                articleId,
                roleId
            })), { transaction });

            // 删除文章角色关系
            await ArticleRole.destroy({
                where: {
                    articleId,
                    roleId: {
                        [Op.in]: deleteRoleIds
                    }
                },
                transaction
            });
        });
    }

    // 根据文章ID，获取角色ID列表
    async getRoleIdList(articleId: number): Promise<number[]> {
        const articleRoles = await ArticleRole.findAll({
            where: {
                articleId
            },
            attributes: ['roleId']
        });
        return articleRoles.map(articleRole => articleRole.roleId);
    }

    // 根据文章ID列表，删除文章角色关系
    async deleteByArticleIdList(articleIdList: number[]): Promise<void> {
        await ArticleRole.destroy({
            where: {
                articleId: {
                    [Op.in]: articleIdList
                }
            }
        });
    }

    // 根据角色ID，删除文章角色关系
    async deleteByRoleId(roleId: number): Promise<void> {
        await ArticleRole.destroy({
            where: {
                roleId
            }
        });
    }
}
