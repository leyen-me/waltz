import ArticleService from '@/server/service/ArticleService';

const articleService = new ArticleService();

export default defineWrappedResponseHandler(async (event) => {
    defineHasAuthority(event, "article:page")

    const query: ArticleQuery = getQuery(event);
    query.title = decodeURIComponent(getQuery(event).title as string);
    const result = await articleService.selectPage(query);
    return defineOk({ data: result });
});
