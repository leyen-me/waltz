export default class CommentNotFoundError extends Error {
    constructor() {
      super("评论未找到");
    }
  }
  