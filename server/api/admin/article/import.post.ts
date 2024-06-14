import ArticleService from "@/server/service/ArticleService";
const articleService = new ArticleService();

export default defineWrappedResponseHandler(async (event) => {
  defineHasAuthority(event, "article:import");
  const attachmentsData = await readFormData(event);
  await articleService.importArticle(attachmentsData);
  return defineOk({});
});
