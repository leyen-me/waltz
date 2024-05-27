import ArticleService from '@/server/service/ArticleService';
const articleService = new ArticleService();

export default defineWrappedResponseHandler(async (event) => {
    const { id, categoryId } = getQuery(event);

    const result = await articleService.getPreviousAndNextArticles(Number(id), Number(categoryId));
    return defineOk({ data: result });
});