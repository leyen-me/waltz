import Favorite from "@/server/models/Favorite";
import BaseService from "@/server/base/BaseService";
import { CreationAttributes } from "sequelize";
import Like from "../models/Like";

export default class FavoriteService extends BaseService<Favorite> {
    constructor() {
        super(Favorite);
    }

    async createFavorite(favoriteData: CreationAttributes<Favorite>): Promise<BaseCreateResponse> {
        // 检查用户是否已经收藏过相同的文章
        const { userId, articleId } = favoriteData;
        const isFavorited = await Like.findOne({ where: { userId, articleId } });
        if (isFavorited) {
            throw new Error('该文章已经处于收藏夹中了,请勿重复收藏哦~');
        }

        // 创建收藏记录
        const createdFavoriteId = await defineTransactionWrapper(async (transaction) => {
            const createdFavorite = await this.create(favoriteData, { transaction });
            return createdFavorite.id as number;
        });

        return createdFavoriteId;
    }

    async deleteFavorite(userId: number, articleId: number): Promise<void> {
        await defineTransactionWrapper(async (transaction) => {
            await this.delete({ where: { userId, articleId }, transaction });
        });
    }

    async getAllFavorites(userId: number): Promise<Favorite[]> {
        return Favorite.findAll({ where: { userId } });
    }

    async countFavorites(articleId: number): Promise<number> {
        return Favorite.count({ where: { articleId } });
    }
}
