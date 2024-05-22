import FavoriteService from '@/server/service/FavoriteService';

const favoriteService = new FavoriteService();


export default defineWrappedResponseHandler(async (event) => {
    const { userId } = getQuery(event);
    const result = await favoriteService.getAllFavorites(userId as number);
    return defineOk({ data: result });
});