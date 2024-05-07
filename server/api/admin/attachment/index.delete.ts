import AttachmentService from '@/server/service/AttachmentService';

const attachmentService = new AttachmentService();

export default defineWrappedResponseHandler(async (event) => {
    hasAuthority(event, "attachment:delete")
    const ids: number[] = await readBody(event);

    await attachmentService.deleteAttachments(ids);
    return defineOk({});
});