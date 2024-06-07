import ArticleService from '@/server/service/ArticleService';
const articleService = new ArticleService();

export default defineWrappedResponseHandler(async (event) => {
    const { id, categoryId } = getQuery(event);
    let result = null;
    if (event.context.user) {
        const { id, superAdmin } = event.context.user;
        result = await articleService.getPreviousAndNextArticles(Number(id), Number(categoryId), id, superAdmin);
    } else {
        result = await articleService.getPreviousAndNextArticles(Number(id), Number(categoryId), undefined, undefined, 0);
    }
    return defineOk({ data: result });
});