import AttachmentService from "@/server/service/AttachmentService";

const attachmentService = new AttachmentService();

export default defineWrappedResponseHandler(async (event) => {
  defineHasAuthority(event, "attachment:save");

  const attachmentsData = await readFormData(event);
  const { NUXT_API_UPLOAD_BASE } = useRuntimeConfig().public;

  // 检查是否有文件上传
  if (!attachmentsData) {
    return defineError({ msg: "请选择需要上传的文件" });
  }
  const result = await attachmentService.createAttachments(
    attachmentsData,
    NUXT_API_UPLOAD_BASE
  );
  return defineOk({ data: result });
});
