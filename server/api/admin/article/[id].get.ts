import ArticleService from '@/server/service/ArticleService';
import User from '~/server/models/User';
const articleService = new ArticleService();

export default defineWrappedResponseHandler(async (event) => {
    defineHasAuthority(event, "article:info")
    const { id } = getRouterParams(event);
    const user: User | null = event.context.user;
    const result = await articleService.getArticleById(Number(id), user, false);
    return defineOk({ data: result });
});