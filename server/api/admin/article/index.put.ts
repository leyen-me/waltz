import ArticleService from '@/server/service/ArticleService';

export default defineWrappedResponseHandler(async (event) => {
    hasAuthority(event, "article:update")
    
    const articleService = new ArticleService();
    const { id, ...updatedArticleData } = await readBody(event);
    updatedArticleData.authorId = event.context.user.id;
    await articleService.updateArticle(id, updatedArticleData);
    return defineOk({});
});