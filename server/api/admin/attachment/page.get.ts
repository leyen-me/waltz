import AttachmentService from '@/server/service/AttachmentService';

const attachmentService = new AttachmentService();

export default defineWrappedResponseHandler(async (event) => {
    defineHasAuthority(event, "attachment:page")

    const query: AttachmentQuery = getQuery(event);
    const result = await attachmentService.selectPage(query);
    return defineOk({ data: result });
});
