import CommentService from '@/server/service/CommentService';
const commentService = new CommentService();

export default defineWrappedResponseHandler(async (event) => {
    defineHasAuthority(event, "comment:info")

    const { id } = getRouterParams(event);
    const result = await commentService.getCommentById(id);
    return defineOk({ data: result });
});