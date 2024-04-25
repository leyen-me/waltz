import ArticleService from '@/server/service/ArticleService';

const articleService = new ArticleService();

export default defineWrappedResponseHandler(async () => {
    const result = await articleService.getAllArticles();
    return defineOk({ data: result });
});
