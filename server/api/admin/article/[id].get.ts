import ArticleService from '@/server/service/ArticleService';
const articleService = new ArticleService();

export default defineWrappedResponseHandler(async (event) => {
    defineHasAuthority(event, "article:info")
    const { id } = getRouterParams(event);

    const result = await articleService.getArticleById(id);
    return defineOk({ data: result });
});