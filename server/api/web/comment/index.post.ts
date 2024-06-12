import CommentService from '@/server/service/CommentService';

const commentService = new CommentService();

export default defineWrappedResponseHandler(async (event) => {

  const commentData = await readBody(event);
  const userId: number = event.context.user.id;
  commentData.userId = userId;
  if (commentData && !commentData.pid) {
    commentData.pid = 0;
  }
  const result = await commentService.createComment(commentData);
  return defineOk({ data: result });
});