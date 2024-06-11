import ArticleService from '@/server/service/ArticleService';
import User from '~/server/models/User';
const articleService = new ArticleService();

export default defineWrappedResponseHandler(async (event) => {
    const { id } = getRouterParams(event);
    const user: User | null = event.context.user;
    const result = await articleService.getArticleById(Number(id), user, true);
    return defineOk({ data: result });
});