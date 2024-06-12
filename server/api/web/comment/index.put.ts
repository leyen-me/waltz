import CommentService from '@/server/service/CommentService';
const commentService = new CommentService();

export default defineWrappedResponseHandler(async (event) => {

    const { id, ...updatedCommentData } = await readBody(event);
    await commentService.updateComment(id, updatedCommentData);
    return defineOk({});
});