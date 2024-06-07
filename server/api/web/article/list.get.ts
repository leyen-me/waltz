import ArticleService from '@/server/service/ArticleService';
import { ArticleStatus } from '~/server/enum';

const articleService = new ArticleService();

export default defineWrappedResponseHandler(async (event) => {
    const { id, superAdmin } = event.context.user;
    const articleStatus = ArticleStatus.values[1];
    const result = await articleService.getAllArticles(decodeURIComponent(getQuery(event).title as string), id, superAdmin, articleStatus);
    return defineOk({ data: result });
});
