import ArticleService from "@/server/service/ArticleService";
const articleService = new ArticleService();

export default defineWrappedResponseHandler(async (event) => {
  defineHasAuthority(event, "article:export")
  
  const data = await articleService.exportArticle();
  const headers = new Headers();
  headers.set("Content-Type", "application/zip");
  const response = new Response(data, {
    status: 200,
    headers: headers,
  });
  event.respondWith(response);
  return defineOk({});
});
