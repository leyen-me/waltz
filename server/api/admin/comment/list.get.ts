import CommentService from '@/server/service/CommentService';
import { listToTree } from '~/common/utils/treeUtil';

const commentService = new CommentService();

export default defineWrappedResponseHandler(async (event) => {
    defineHasAuthority(event, "comment:list")
    let result = await commentService.getAllComments();
    return defineOk({ data: listToTree(result, "id", "pid", 0) });
});
