import ArticleService from "@/server/service/ArticleService";

const articleService = new ArticleService();
// todo 新增文章附件的时候放在articleService中调用一层，建立出来一个article文件夹，所有的文章的图片都放置于该文件夹下，其他的附件则都放置于attachment文件夹下。
// 附件上传的时候那个根据文章后缀名分类的方法不要了
export default defineWrappedResponseHandler(async (event) => {
  const articleData = await readBody(event);
  articleData.authorId = event.context.user.id;
  const result = await articleService.createArticle(articleData);
  return defineOk({ data: result });
});
