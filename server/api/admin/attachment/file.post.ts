import AttachmentService from "@/server/service/AttachmentService";

const attachmentService = new AttachmentService();

export default defineWrappedResponseHandler(async (event) => {
  defineHasAuthority(event, "attachment:save");

  const attachmentsData = await readFormData(event);
  const { pid } = getQuery(event);

  if (!attachmentsData) {
    return defineError({ msg: "请选择需要上传的文件" });
  }

  const result = await attachmentService.uploadFiles(
    attachmentsData, pid as number
  );
  return defineOk({ data: result });
});
