import ArticleService from '@/server/service/ArticleService';
import { ArticleStatus } from '@/server/enum';

const articleService = new ArticleService();

export default defineWrappedResponseHandler(async (event) => {

    const query: ArticleQuery = getQuery(event);
    query.status = ArticleStatus.values[1];
    let result = null;

    if (event.context.user) {
        const { id, superAdmin } = event.context.user;
        result = await articleService.selectPage(query, id, superAdmin)
    } else {
        query.isPrivate = 0;
        result = await articleService.selectPage(query);
    }
    return defineOk({ data: result });
});
