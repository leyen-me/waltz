import ArticleService from '@/server/service/ArticleService';
import { ArticleStatus } from '@/server/enum';

const articleService = new ArticleService();

export default defineWrappedResponseHandler(async (event) => {

    const query: ArticleQuery = getQuery(event);
    query.status = ArticleStatus.values[1];
    if (event.context.user) {
        query.isSuperAdmin = event.context.user.superAdmin as number;
        query.userId = event.context.user.id as number;
    }
    const result = await articleService.selectPage(query)
    return defineOk({ data: result });
});
