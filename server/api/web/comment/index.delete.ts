import CommentService from '@/server/service/CommentService';

const commentService = new CommentService();

export default defineWrappedResponseHandler(async (event) => {
    const { articleId, userId } = await readBody(event);
    await commentService.deleteUserComment(articleId, userId);
    return defineOk({});
});