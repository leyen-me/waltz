import ArticleService from '@/server/service/ArticleService';
const articleService = new ArticleService();

export default defineWrappedResponseHandler(async (event) => {
    const { id } = getRouterParams(event);
    const ip = getRequestIP(event);
    

    const result = await articleService.getArticleById(id);
    return defineOk({ data: result });
});