import ArticleService from "@/server/service/ArticleService";
const articleService = new ArticleService();

export default defineWrappedResponseHandler(async (event) => {
  defineHasAuthority(event, "article:import");

  const attachmentsData = await readFormData(event);
  if (!attachmentsData) {
    return defineError({ msg: "请选择文件" });
  }
  await articleService.importArticle(attachmentsData);
  return defineOk({});
});
