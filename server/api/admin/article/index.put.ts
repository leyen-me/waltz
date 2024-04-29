import ArticleService from '@/server/service/ArticleService';

export default defineWrappedResponseHandler(async (event) => {
    const articleService = new ArticleService();
    const { id, ...updatedArticleData } = await readBody(event);
    const result = await articleService.updateArticle(id, updatedArticleData);
    return defineOk({ msg: result.message });
});