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

        await defineTransactionWrapper(async (transaction) => { // 在此处使用事务
            // 直接获取 'files' 键对应的所有值
            const files = formData.getAll('files');

            // 如果值是一个数组，则遍历数组并上传每个文件
            for (const file of files) {
                // 将 file 断言为 File 类型
                const fileObj = file as File;
                const fileData = fileObj;
                const filePath = (await defineUploadFile(fileData, baseUploadDir)).replace("public", "").replace("../", "");

                // 构建附件数据对象
                const attachmentData = {
                    title: fileObj.name, // 使用文件名作为标题
                    url: filePath, // 使用完整的 URL
                    ext: defineGetFileExtension(fileObj.name), // 获取文件扩展名
                    size: fileObj.size // 获取文件大小
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
        await defineTransactionWrapper(async (transaction) => { // 在此处使用事务
            await this.update(attachmentData, { where: { id: attachmentId }, transaction });
        });
    }

    async deleteAttachments(attachmentIds: number[]): Promise<void> {
        await defineTransactionWrapper(async (transaction) => { // 在此处使用事务
            await this.delete({ where: { id: attachmentIds }, transaction });
        });
    }

    async getAttachmentById(attachmentId: number | string): Promise<Attachment | null> {
        return await Attachment.findByPk(attachmentId);
    }

    async getAllAttachments(title?: string): Promise<Attachment[]> {
        return await Attachment.findAll();
    }
}
