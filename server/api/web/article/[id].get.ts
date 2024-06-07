import ArticleService from '@/server/service/ArticleService';
const articleService = new ArticleService();

export default defineWrappedResponseHandler(async (event) => {
    const { id } = getRouterParams(event);


    let result = null;

    if (event.context.user) {
        const { id, superAdmin } = event.context.user;
        result = await articleService.getArticleById(Number(id), true, id, superAdmin);
    } else {
        result = await articleService.getArticleById(Number(id), true, undefined, undefined, 0);
    }

    return defineOk({ data: result });
});