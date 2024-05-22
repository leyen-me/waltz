import CommentService from '@/server/service/CommentService';

const commentService = new CommentService();

export default defineWrappedResponseHandler(async (event) => {
    defineHasAuthority(event, "comment:save")
  
    const commentData = await readBody(event);
    const result = await commentService.createComment(commentData);
    return defineOk({ data: result });
  });