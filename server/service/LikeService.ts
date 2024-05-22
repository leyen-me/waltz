import Like from "@/server/models/Like";
import BaseService from "@/server/base/BaseService";
import { CreationAttributes } from "sequelize";

export default class LikeService extends BaseService<Like> {
    constructor() {
        super(Like);
    }

    async createLike(likeData: CreationAttributes<Like>): Promise<BaseCreateResponse> {
        // 检查用户是否已经点过赞了
        const { userId, articleId } = likeData;
        const isLike = await Like.findOne({ where: { userId, articleId } });
        if (isLike) {
            throw new Error('该文章已经点过赞了，不能重复点赞！');
        }

        // 创建点赞记录
        const createdLikeId = await defineTransactionWrapper(async (transaction) => {
            const createLike = await this.create(likeData, { transaction });
            return createLike.id as number;
        });

        return createdLikeId;
    }

    async deleteLike(userId: number, articleId: number): Promise<void> {
        await this.delete({ where: { userId, articleId } });
    }

    async getAllLikes(userId: number): Promise<Like[]> {
        return Like.findAll({ where: { userId } });
    }

    async countLikes(articleId: number): Promise<number> {
        return Like.count({ where: { articleId } });
    }
}
