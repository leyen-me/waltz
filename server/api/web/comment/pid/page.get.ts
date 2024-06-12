import CommentService from '@/server/service/CommentService';

const commentService = new CommentService();

export default defineWrappedResponseHandler(async (event) => {

    const query: CommentQuery = getQuery(event);
    const result = await commentService.selectPageByPid(query);
    return defineOk({ data: result });
});
