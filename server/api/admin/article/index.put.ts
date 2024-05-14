import ArticleService from '@/server/service/ArticleService';

const articleService = new ArticleService();
export default defineWrappedResponseHandler(async (event) => {
    defineHasAuthority(event, "article:update")

    const { id, ...updatedArticleData } = await readBody(event);
    updatedArticleData.authorId = event.context.user.id;
    await articleService.updateArticle(id, updatedArticleData);
    return defineOk({});
});