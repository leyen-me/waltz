import Comment from "@/server/models/Comment";
import BaseService from "@/server/base/BaseService";
import { CreationAttributes, Op } from "sequelize";
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

        let whereConditions: any = { content: { [Op.like]: `%${content}%` } };

        if (status) {
            whereConditions.status = status;
        }

        const whereClause = sequelize.literal(`
            ${whereConditions}
        `);

        const options: any = {
            offset,
            limit,
            where: whereClause,
            attributes: [
                'id',
                'article_id as articleId',
                'pid',
                'user_id as userId',
                'content',
                'likes_count as likesCount',
                'status',
                [sequelize.literal('t_article.title'), 'articleTitle'],
                [sequelize.literal('t_user.username'), 'username'],
                [sequelize.literal('pu.username'), 'parentUsername'],
                [sequelize.literal('pc.content'), 'parentComment']
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
            await this.delete({ where: { id: commentId }, transaction });
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

    async hasChildComments(commentId: number): Promise<boolean> {
        const count = await Comment.count({
            where: { parentId: commentId }
        });
        return count > 0;
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