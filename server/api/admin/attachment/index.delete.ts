import AttachmentService from '@/server/service/AttachmentService';

const attachmentService = new AttachmentService();

export default defineWrappedResponseHandler(async (event) => {
    defineHasAuthority(event, "attachment:delete")
    const id: number = await readBody(event);

    await attachmentService.deleteAttachment(id);
    return defineOk({});
});