import ArticleService from '@/server/service/ArticleService';
import User from '@/server/models/User';

const articleService = new ArticleService();

export default defineWrappedResponseHandler(async (event) => {
    defineHasAuthority(event, "article:list")
    const user:User = event.context.user;
    const result = await articleService.getAllArticles(decodeURIComponent(getQuery(event).title as string),user);
    return defineOk({ data: result });
});
