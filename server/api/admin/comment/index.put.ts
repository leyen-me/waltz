import CommentService from '@/server/service/CommentService';
const commentService = new CommentService();

export default defineWrappedResponseHandler(async (event) => {
    defineHasAuthority(event, "comment:update")

    const { id, pid, ...updatedCommentData } = await readBody(event);
    if (id === pid) {
        return defineError({ msg: "上级评论不能为自己" });
    }
    await commentService.updateComment(id, updatedCommentData);
    return defineOk({});
});