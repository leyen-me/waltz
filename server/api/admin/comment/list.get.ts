import CommentService from '@/server/service/CommentService';

const commentService = new CommentService();

export default defineWrappedResponseHandler(async (event) => {
    defineHasAuthority(event, "comment:list")
    let result = await commentService.getAllComments();
    return defineOk({ data: defineListToTree(result, "id", "pid", 0) });
});
