import ArticleService from '@/server/service/ArticleService';

const articleService = new ArticleService();

export default defineWrappedResponseHandler(async (event) => {
    const ids: number[] = await readBody(event);

    const result = await articleService.deleteArticles(ids);
    return defineOk({ msg: result.message });
});