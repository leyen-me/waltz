import CommentService from '@/server/service/CommentService';
import { listToTree } from '~/common/utils/treeUtil';

const commentService = new CommentService();

export default defineWrappedResponseHandler(async (event) => {
    let result = await commentService.getAllComments("pass");
    return defineOk({ data: listToTree(result, "id", "pid", 0) });
});
