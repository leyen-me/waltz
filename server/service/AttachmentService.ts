import Attachment from '@/server/models/Attachment';
import BaseService from '@/server/base/BaseService';
import { CreationAttributes } from 'sequelize';
import { defineUploadFile } from '../utils/fileUtil';

export default class AttachmentService extends BaseService<Attachment> {
    constructor() {
        super(Attachment);
    }

    async selectPage(query: AttachmentQuery): Promise<BasePageResponse<Attachment>> {
        return this.page(query);
    }

    async createAttachments(formData: FormData, baseUploadDir: string): Promise<string[]> {
        const results: string[] = [];

        await defineTransactionWrapper(async (transaction) => {
            const files = formData.getAll('files');

            // 如果值是一个数组，则遍历数组并上传每个文件
            for (const file of files) {
                const fileObj = file as File;
                const fileData = fileObj;
                const filePath = (await defineUploadFile(fileData, baseUploadDir)).replace("public", "").replace("../", "");

                // 构建附件数据对象
                const attachmentData = {
                    title: fileObj.name,
                    url: filePath,
                    ext: defineGetFileExtension(fileObj.name),
                    size: fileObj.size
                };
                // 创建附件
                const createdAttachment = await this.create(attachmentData, { transaction });
                if (createdAttachment) {
                    results.push(filePath);
                }
            }
        });

        return results;
    }

    async updateAttachment(attachmentId: number, attachmentData: Partial<CreationAttributes<Attachment>>): Promise<void> {
        await defineTransactionWrapper(async (transaction) => {
            await this.update(attachmentData, { where: { id: attachmentId }, transaction });
        });
    }

    async deleteAttachments(attachmentIds: number[]): Promise<void> {
        await defineTransactionWrapper(async (transaction) => {
            await this.delete({ where: { id: attachmentIds }, transaction });
        });
    }

    async getAttachmentById(attachmentId: number): Promise<Attachment | null> {
        return await Attachment.findByPk(attachmentId);
    }

    async getAllAttachments(title?: string): Promise<Attachment[]> {
        return await Attachment.findAll();
    }
}
