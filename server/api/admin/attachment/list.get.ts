import AttachmentService from '@/server/service/AttachmentService';

const attachmentService = new AttachmentService();


export default defineWrappedResponseHandler(async (event) => {
    defineHasAuthority(event, "attachment:list")

    const result = await attachmentService.getAllAttachments();
    return defineOk({ data: result });
});
