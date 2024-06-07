import ArticleService from '@/server/service/ArticleService';
import { ArticleStatus } from '~/server/enum';

const articleService = new ArticleService();

export default defineWrappedResponseHandler(async (event) => {
    const articleStatus = ArticleStatus.values[1];

    let result = null;

    if (event.context.user) {
        const { id, superAdmin } = event.context.user;
        result = await articleService.getAllArticles(decodeURIComponent(getQuery(event).title as string), id, superAdmin, articleStatus);
    }else{
        result = await articleService.getAllArticles(decodeURIComponent(getQuery(event).title as string),undefined,undefined,articleStatus,0);
    }

    return defineOk({ data: result });
});
