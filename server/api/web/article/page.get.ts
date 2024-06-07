import ArticleService from '@/server/service/ArticleService';
import { ArticleStatus } from '@/server/enum';

const articleService = new ArticleService();

export default defineWrappedResponseHandler(async (event) => {

    const query: ArticleQuery = getQuery(event);
    query.status = ArticleStatus.values[1];
    const { id, superAdmin } = event.context.user;
    const result = await articleService.selectPage(query, id, superAdmin);
    return defineOk({ data: result });
});
