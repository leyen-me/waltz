import ArticleService from '@/server/service/ArticleService';
import { ArticleStatus } from '@/server/enum';
import User from '@/server/models/User';

const articleService = new ArticleService();

export default defineWrappedResponseHandler(async (event) => {
    const articleStatus = ArticleStatus.values[1];
    const user: User | null = event.context.user;
    const result = await articleService.getAllArticles(decodeURIComponent(getQuery(event).title as string), user, articleStatus);
    return defineOk({ data: result });
});
