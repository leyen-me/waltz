import AttachmentService from '@/server/service/AttachmentService';

const attachmentService = new AttachmentService();

export default defineWrappedResponseHandler(async (event) => {
    defineHasAuthority(event, "attachment:delete")
    const { id } = await readBody(event);

    await attachmentService.deleteAttachment(Number(id));
    return defineOk({});
});