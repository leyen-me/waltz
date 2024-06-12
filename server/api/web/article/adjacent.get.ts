import ArticleService from '@/server/service/ArticleService';
import User from '@/server/models/User';
const articleService = new ArticleService();

export default defineWrappedResponseHandler(async (event) => {
    const req = getQuery(event);
    
    console.log("+++",req);
    
    // const user: User | null = event.context.user;
    // console.log("---------------------",categoryId);
    
    // const result = await articleService.getPreviousAndNextArticles(Number(id), user, Number(categoryId));
    return defineOk({ data: 0 });
});