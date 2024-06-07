import ArticleService from '@/server/service/ArticleService';

const articleService = new ArticleService();

export default defineWrappedResponseHandler(async (event) => {
    defineHasAuthority(event, "article:page")

    const query: ArticleQuery = getQuery(event);
    query.title = decodeURIComponent(query.title as string);
    const { id, superAdmin } = event.context.user;
    const result = await articleService.selectPage(query, id, superAdmin);
    return defineOk({ data: result });
});
