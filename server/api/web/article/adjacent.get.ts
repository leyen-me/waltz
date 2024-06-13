import ArticleService from '@/server/service/ArticleService';
import User from '@/server/models/User';
const articleService = new ArticleService();

export default defineWrappedResponseHandler(async (event) => {
    const { id, categoryId } = getQuery(event);

    const user: User | null = event.context.user;

    const result = await articleService.getPreviousAndNextArticles(Number(id), user, Number(categoryId));
    return defineOk({ data: result });
});