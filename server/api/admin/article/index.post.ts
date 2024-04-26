import ArticleService from '@/server/service/ArticleService';

const articleService = new ArticleService();

export default defineWrappedResponseHandler(async (event) => {
    const articleData = await readBody(event);
    const result = await articleService.createArticle(articleData);
    return defineOk({ msg: result.message });
});