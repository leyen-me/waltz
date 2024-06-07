import ArticleService from '@/server/service/ArticleService';

const articleService = new ArticleService();

export default defineWrappedResponseHandler(async (event) => {
    defineHasAuthority(event, "article:list")
    const result = await articleService.getAllArticles(decodeURIComponent(getQuery(event).title as string));
    return defineOk({ data: result });
});
