import AttachmentService from "@/server/service/AttachmentService";

const attachmentService = new AttachmentService();

export default defineWrappedResponseHandler(async (event) => {
    defineHasAuthority(event, "attachment:save");

    const attachmentData = await readBody(event);
    const result = await attachmentService.createFolder(attachmentData);
    return defineOk({ data: result });
});
