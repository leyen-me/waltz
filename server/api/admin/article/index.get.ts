import Article from "@/server/models/Article";

export default defineWrappedResponseHandler(async () => {
  // todo get
  Article.create();
  return { data: "Article" };
});
