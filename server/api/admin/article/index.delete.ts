import ArticleService from '@/server/service/ArticleService';

const articleService = new ArticleService();

export default defineWrappedResponseHandler(async (event) => {
    defineHasAuthority(event, "article:delete")
    const ids: number[] = await readBody(event);

    await articleService.deleteArticles(ids);
    return defineOk({});
});