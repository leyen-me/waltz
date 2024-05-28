import Comment from "@/server/models/Comment";
import BaseService from "@/server/base/BaseService";
import { CreationAttributes } from "sequelize";

export default class CommentService extends BaseService<Comment> {
    constructor() {
        super(Comment);
    }

    async selectPage(query: CommentQuery): Promise<BasePageResponse<Comment>> {
        return await this.page(query);
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

    async getAllComments(): Promise<Comment[]> {
        return Comment.findAll();
    }

    async countCommentsByArticle(articleId: number): Promise<number> {
        return Comment.count({ where: { articleId } });
    }
}