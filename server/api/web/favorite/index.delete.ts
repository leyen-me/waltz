import FavoriteService from '@/server/service/FavoriteService';

const favoriteService = new FavoriteService();

export default defineWrappedResponseHandler(async (event) => {
    const { userId, articleId } = await readBody(event);
    await favoriteService.deleteFavorite(userId, articleId);
    return defineOk({});
});