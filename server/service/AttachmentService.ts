import fs from 'fs';
import { CreationAttributes } from 'sequelize';
import Attachment from '../models/Attachment';
import { defineUploadFile, defineValidateFile, defineGetFileExtension, defineDeleteFile, defineCreateFolder } from '../utils/fileUtil';
import AttachmentNotFoundError from '../error/sys/attachment/AttachmentNotFoundError';
import { nanoid } from 'nanoid';

export default class AttachmentService {

    /**
    * 创建文件夹
    * @param folderName
    * @param pid
    * @returns
    */
    async createFolder(attachmentData: CreationAttributes<Attachment>): Promise<number> {
        const { NUXT_API_UPLOAD_BASE } = useRuntimeConfig().public;

        const parentFolder = await Attachment.findByPk(attachmentData.pid);

        let folderPath: string;
        let attachmentName = nanoid()
        if (parentFolder) {
            folderPath = NUXT_API_UPLOAD_BASE + parentFolder.url + '/' + attachmentName;
        } else {
            folderPath = NUXT_API_UPLOAD_BASE + '/' + attachmentName;
        }

        defineCreateFolder(folderPath);

        const createdFolder = await Attachment.create({
            title: attachmentData.title,
            url: parentFolder ? parentFolder.url + '/' + attachmentName : '/' + attachmentName,
            pid: attachmentData.pid ? attachmentData.pid : 0,
            isFolder: 1,
            type: 'folder',
        });

        return createdFolder.id as number;
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

            if (pid) {
                const parentFolder = await Attachment.findByPk(pid);
                for (const file of files) {
                    const fileObj = file as File;
                    const mimeType = defineValidateFile(fileObj);
                    const ext = defineGetFileExtension(fileObj.name);
                    const { filePath, fileTitle } = (await defineUploadFile(fileObj, parentFolder ? NUXT_API_UPLOAD_BASE + parentFolder.url + "/" : NUXT_API_UPLOAD_BASE + "/"));

                    // let title = "";
                    // if (!/[^\u0000-\u00ff]/.test(fileObj.name)) {
                    //     title = Buffer.from(fileObj.name, 'latin1').toString('utf8');
                    // }

                    const attachmentData = {
                        title: fileTitle,
                        url: filePath,
                        ext: ext,
                        size: fileObj.size,
                        pid: pid,
                        isFolder: 0,
                        type: mimeType
                    };

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
    async deleteFiles(id: number): Promise<void> {
        const { NUXT_API_UPLOAD_BASE } = useRuntimeConfig().public;
        const attachment = await Attachment.findByPk(id);
        if (!attachment) {
            throw new AttachmentNotFoundError()
        }

        if (attachment.isFolder) {
            defineDeleteFile(NUXT_API_UPLOAD_BASE + attachment.url);
            const children = await Attachment.findAll({ where: { pid: id } });

            for (const child of children) {
                if (child.id !== undefined) {
                    await this.deleteFiles(child.id);
                }
            }
        }

        if (!attachment.isFolder && attachment.url) {
            defineDeleteFile(attachment.url);
        }
        await Attachment.destroy({ where: { id } });
    }

    async downloadFiles(id: number): Promise<{ type: string, data: any } | null> {
        const { NUXT_API_UPLOAD_BASE } = useRuntimeConfig().public;
        const attachment = await Attachment.findOne({
            where: { id },
        });
        if (attachment && attachment.url) {
            const path = NUXT_API_UPLOAD_BASE + attachment.url;
            const imageData = fs.readFileSync(path);
            return { type: attachment.type, data: imageData };
        }
        return null;
    }
}
