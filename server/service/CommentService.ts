import Comment from "@/server/models/Comment";
import BaseService from "@/server/base/BaseService";
import { CreationAttributes, Op, QueryTypes } from "sequelize";
import User from "../models/User";
import sequelize from "../db";

export default class CommentService extends BaseService<Comment> {
    constructor() {
        super(Comment);
    }

    async selectPage(query: CommentQuery): Promise<BasePageResponse<Comment>> {
        let { page, limit, content, status } = query;
        page = Number(page);
        limit = Number(limit);

        const offset = (page - 1) * limit;

        let whereConditions: any = {};

        if (content) {
            whereConditions.content = { [Op.like]: `%${content}%` };
        }

        if (status) {
            whereConditions.status = status;
        }

        const options: any = {
            offset,
            limit,
            where: whereConditions,
            attributes: [
                'id',
                'articleId',
                'pid',
                'userId',
                'content',
                'likesCount',
                'status',
                [sequelize.literal('(SELECT title FROM t_article WHERE t_article.id = Comment.article_id)'), 'articleTitle'],
                [sequelize.literal('(SELECT username FROM t_user WHERE t_user.id = Comment.user_id)'), 'username'],
                [sequelize.literal('(SELECT username FROM t_user WHERE t_user.id = Comment.pid)'), 'parentUsername'],
                'createdAt',
                'updatedAt'
            ],
        };

        const { rows, count } = await Comment.findAndCountAll(options);

        const totalPages = Math.ceil(count / limit);
        console.log(rows);

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


    async selectPageByArticleId(query: CommentQuery): Promise<BasePageResponse<Comment>> {
        let { page, limit, articleId } = query;
        page = Number(page);
        limit = Number(limit);

        const offset = (page - 1) * limit;

        const sqlQuery = `
            SELECT
                c.id,
                c.article_id AS articleId,
                c.pid,
                c.user_id AS userId,
                c.content,
                c.likes_count AS likesCount,
                c.status,
                a.title AS articleTitle,
                u.username,
                u.avatar, 
                parentUser.username AS parentUsername,
                COUNT(children.id) AS childrenCount,
                DATE_FORMAT(c.created_at, '%Y-%m-%d %H:%i:%S') AS createdAt
            FROM
                t_comment AS c
            LEFT JOIN
                t_article a ON c.article_id = a.id
            LEFT JOIN
                t_user u ON c.user_id = u.id
            LEFT JOIN
                t_user AS parentUser ON c.pid = parentUser.id
            LEFT JOIN
                t_comment AS children ON c.id = children.pid  AND children.status = 'pass'
            WHERE
                c.pid = 0
                AND c.status = 'pass'
                AND c.article_id = :articleId
            GROUP BY
                c.id
            ORDER BY
                c.likes_count DESC,
                childrenCount DESC,
                c.created_at DESC,
                c.id DESC
            LIMIT
                :limit
            OFFSET
                :offset
        `;

        const replacements = {
            articleId: articleId,
            limit: limit,
            offset: offset
        };

        const rows: Comment[] = await sequelize.query(sqlQuery, {
            replacements: replacements,
            type: QueryTypes.SELECT
        });

        const countQuery = `
            SELECT
                COUNT(*) AS count
            FROM
                t_comment AS c
            WHERE
                c.pid = 0
                AND c.status = 'pass'
                AND c.article_id = :articleId
        `;

        const [countResult]: { count: number }[] = await sequelize.query(countQuery, {
            replacements: { articleId: articleId },
            type: QueryTypes.SELECT
        });



        const count = countResult.count;

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


    async selectPageByPid(query: CommentQuery): Promise<BasePageResponse<Comment>> {
        let { page, limit, pid } = query;
        page = Number(page);
        limit = Number(limit);

        const offset = (page - 1) * limit;

        let whereConditions: any = { pid, status: 'pass' };

        const options: any = {
            offset,
            limit,
            where: whereConditions,
            attributes: [
                'id',
                'articleId',
                'pid',
                'userId',
                'content',
                'likesCount',
                'status',
                [sequelize.literal('(SELECT title FROM t_article WHERE t_article.id = Comment.article_id)'), 'articleTitle'],
                [sequelize.literal('(SELECT username FROM t_user WHERE t_user.id = Comment.user_id)'), 'username'],
                [sequelize.literal('(SELECT username FROM t_user WHERE t_user.id = Comment.pid)'), 'parentUsername'],
                [sequelize.literal('(SELECT COUNT(1) FROM t_comment AS children WHERE children.pid = Comment.id AND children.status = "pass")'), 'childrenCount'],
                'createdAt',
                'updatedAt'
            ],
            order: [
                [sequelize.literal('likesCount'), 'DESC'],
                [sequelize.literal('childrenCount'), 'DESC'],
                ['createdAt', 'DESC'],
                ['id', 'DESC']
            ]
        };

        const { rows, count } = await Comment.findAndCountAll(options);

        const totalPages = Math.ceil(count / limit);
        console.log(rows);

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


    async createComment(commentData: CreationAttributes<Comment>): Promise<BaseCreateResponse> {
        const createdCommentId = await defineTransactionWrapper(async (transaction) => {
            const createdComment = await this.create(commentData, { transaction });
            return createdComment.id as number;
        });
        return createdCommentId;
    }

    async updateComment(commentId: number, commentData: Partial<CreationAttributes<Comment>>): Promise<void> {
        await defineTransactionWrapper(async (transaction) => {
            await this.update(commentData, { where: { id: commentId }, transaction });
        });
    }

    async deleteComment(commentId: number): Promise<void> {
        await defineTransactionWrapper(async (transaction) => {
            const comment = await Comment.findByPk(commentId, { transaction });

            if (!comment) {
                throw new Error(`找不到 ID 为 ${commentId} 的评论。`);
            }

            const childrenCount = await Comment.count({ where: { pid: commentId }, transaction });

            if (childrenCount > 0) {
                throw new Error(`无法删除 ID 为 ${commentId} 的评论，因为它有子评论。`);
            }

            // 删除评论
            await comment.destroy({ transaction });
        });
    }



    async deleteUserComment(articleId: number, userId: number): Promise<void> {
        // 检查评论是否存在以及是否属于当前用户
        const comment = await Comment.findOne({ where: { articleId, userId } });
        if (!comment) {
            throw new Error('评论不存在!');
        }
        // 删除评论
        await this.delete({ where: { articleId, userId } });
    }

    async getCommentById(commentId: number): Promise<Comment | null> {
        return await Comment.findByPk(commentId);
    }

    async getAllComments(status?: CommentStatusEnum): Promise<Comment[]> {
        return await Comment.findAll({ where: { status: { status } } });
    }

    async countCommentsByArticle(articleId: number): Promise<number> {
        return await Comment.count({ where: { articleId } });
    }
}