import ArticleService from "@/server/service/ArticleService";

const articleService = new ArticleService();
export default defineWrappedResponseHandler(async (event) => {
  hasAuthority(event, "article:save")

  const articleData = await readBody(event);
  articleData.authorId = event.context.user.id;
  const result = await articleService.createArticle(articleData);
  return defineOk({ data: result });
});
