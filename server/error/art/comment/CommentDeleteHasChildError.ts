export default class CommentDeleteHasChildError extends Error {
    constructor() {
      super("请先删除子评论");
    }
  }
  