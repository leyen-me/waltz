import AttachmentService from '@/server/service/AttachmentService';

const attachmentService = new AttachmentService();


export default defineWrappedResponseHandler(async (event) => {
    defineHasAuthority(event, "attachment:list")
    const { pid } = getQuery(event);
    const result = await attachmentService.getFolderContents(Number(pid));
    return defineOk({ data: result });
});
