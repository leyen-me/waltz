import CommentService from '@/server/service/CommentService';

const commentService = new CommentService();

export default defineWrappedResponseHandler(async (event) => {
  
    const commentData = await readBody(event);
    const result = await commentService.createComment(commentData);
    return defineOk({ data: result });
  });