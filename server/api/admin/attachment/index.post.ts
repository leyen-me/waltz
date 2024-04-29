import AttachmentService from '@/server/service/AttachmentService';
import { baseUploadDir } from '@/server/config';

const attachmentService = new AttachmentService();

export default defineWrappedResponseHandler(async (event) => {
    const attachmentsData = await readFormData(event);

    // 检查是否有文件上传
    if (!attachmentsData) {
        return defineError({ msg: "请选择需要上传的文件" });
    }
    const result = await attachmentService.createAttachments(attachmentsData, baseUploadDir);
    return defineOk({ data: result });
});