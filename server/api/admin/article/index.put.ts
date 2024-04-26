import ArticleService from '@/server/service/ArticleService';

const articleService = new ArticleService();

export default defineWrappedResponseHandler(async (event) => {
    const { id, ...updatedArticleData } = await readBody(event);
    const result = await articleService.updateArticle(id, updatedArticleData);
    return defineOk({ msg: result.message });
});