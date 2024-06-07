import ArticleService from '@/server/service/ArticleService';

const articleService = new ArticleService();

export default defineWrappedResponseHandler(async (event) => {
    defineHasAuthority(event, "article:list")
    const { id, superAdmin } = event.context.user;
    const result = await articleService.getAllArticles(decodeURIComponent(getQuery(event).title as string), id, superAdmin);
    return defineOk({ data: result });
});
