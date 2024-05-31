import { CreationAttributes } from 'sequelize';
import Attachment from '../models/Attachment';
import { defineUploadFile, defineValidateFile, defineGetFileExtension, defineDeleteFile } from '../utils/fileUtil';

export default class AttachmentService {

    /**
    * 创建文件夹
    * @param folderName
    * @param pid
    * @returns
    */
    async createFolder(attachmentData: CreationAttributes<Attachment>, pid: number = 0): Promise<number> {

        const parentFolder = await Attachment.findByPk(pid);
        const createdFolder = await Attachment.create({
            title: attachmentData.title,
            url: parentFolder ? parentFolder.url + '/' + attachmentData.title : '/' + attachmentData.title,
            pid: attachmentData.pid,
            isFolder: 1,
            type: 'folder',
        });

        if (!createdFolder.id) {
            throw new Error('Failed to create folder');
        }
        return createdFolder.id;
    }

    /**
   * 上传文件
   * @param formData
   * @returns
   */
    async uploadFiles(formData: FormData, pid: number = 0): Promise<number[]> {
        const { NUXT_API_UPLOAD_BASE } = useRuntimeConfig().public;
        const primaryKeys: number[] = [];

        await defineTransactionWrapper(async (transaction) => {
            const files = formData.getAll('files');
            console.log(pid);

            if (pid) {
                const parentFolder = await Attachment.findByPk(pid);
                for (const file of files) {
                    const fileObj = file as File;
                    const mimeType = defineValidateFile(fileObj);
                    const ext = defineGetFileExtension(fileObj.name);
                    const filePath = (await defineUploadFile(fileObj, parentFolder ? NUXT_API_UPLOAD_BASE + parentFolder.url : NUXT_API_UPLOAD_BASE));

                    const attachmentData = {
                        title: fileObj.name,
                        url: filePath,
                        ext: ext,
                        size: fileObj.size,
                        pid: pid,
                        isFolder: 0,
                        type: mimeType
                    };
                    console.log(attachmentData);

                    const createdAttachment = await Attachment.create(attachmentData, { transaction });
                    if (createdAttachment && createdAttachment.id) {
                        primaryKeys.push(createdAttachment.id);
                    }
                }
            }
        });
        return primaryKeys;
    }

    /**
     * 获取文件夹内容
     * @param pid
     * @returns
     */
    async getFolderContents(pid: number): Promise<Attachment[]> {
        const contents = await Attachment.findAll({
            where: { pid },
            order: [
                ['is_folder', 'DESC'],
                ['title', 'ASC']
            ]
        });
        return contents;
    }

    /**
     * 递归删除文件夹及其内容
     * @param id
     * @returns
     */
    async deleteAttachment(id: number): Promise<void> {
        const attachment = await Attachment.findByPk(id);

        if (!attachment) {
            throw new Error('Attachment not found');
        }

        if (attachment.isFolder) {
            const children = await Attachment.findAll({ where: { pid: id } });

            for (const child of children) {
                if (child.id !== undefined) {
                    await this.deleteAttachment(child.id);
                }
            }
        }

        if (!attachment.isFolder && attachment.url) {
            defineDeleteFile(attachment.url);
        }
        await Attachment.destroy({ where: { id } });
    }
}
