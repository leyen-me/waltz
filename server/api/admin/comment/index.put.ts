import CommentService from '@/server/service/CommentService';
const commentService = new CommentService();

export default defineWrappedResponseHandler(async (event) => {
    defineHasAuthority(event, "comment:update")
    const { id, pid, ...updatedCommentData } = await readBody(event);
    await commentService.updateComment(id, updatedCommentData);
    return defineOk({});
});