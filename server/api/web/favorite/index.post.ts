import FavoriteService from '@/server/service/FavoriteService';

const favoriteService = new FavoriteService();

export default defineWrappedResponseHandler(async (event) => {
    const favoriteData = await readBody(event);
    const result = await favoriteService.createFavorite(favoriteData);
    return defineOk({ data: result });
});