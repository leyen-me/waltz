import CommentService from '@/server/service/CommentService';

const commentService = new CommentService();

export default defineWrappedResponseHandler(async (event) => {
    defineHasAuthority(event, "comment:page")

    const query: CommentQuery = getQuery(event);
    const result = await commentService.selectPage(query);
    return defineOk({ data: result });
});
