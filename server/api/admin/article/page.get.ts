import ArticleService from '@/server/service/ArticleService';

const articleService = new ArticleService();

export default defineWrappedResponseHandler(async (event) => {
    hasAuthority(event, "article:page")

    const query: ArticleQuery = getQuery(event);
    const result = await articleService.page(query);
    return defineOk({ data: result });
});
