import CommentService from '@/server/service/CommentService';

const commentService = new CommentService();

export default defineWrappedResponseHandler(async (event) => {
    defineHasAuthority(event, "comment:delete")
    const id: number = await readBody(event);
    const hasChildStatus = await commentService.hasChildComments(id);
    if (hasChildStatus) {
        return defineError({ msg: "该评论下有子评论，不能直接删除父评论" });
    }
    await commentService.deleteComment(id);
    return defineOk({});
});