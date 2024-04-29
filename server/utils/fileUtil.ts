import fs from 'fs';
import path from 'path';




/**
 * 验证上传文件是否符合要求，并返回对应的子目录
 * @param file 文件对象
 * @returns 子目录名称
 */
const validateFile = (file: File): string => {

    // 定义允许上传的最大文件大小（以字节为单位）
    const maxFileSize = 1024 * 1024 * 1024; // 1GB

    // 获取文件名的后缀名
    const fileExtension = getFileExtension(file.name);

    // 定义允许上传的文件扩展名
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.pdf', '.doc', '.docx', '.txt', '.mp3', '.mp4', '.avi', '.wav', '.ogg', '.html', '.css', '.js', '.md', '.java', '.py'];

    // 检查文件扩展名是否在允许的范围内
    if (!allowedExtensions.includes(fileExtension)) {
        throw new Error('Invalid file type');
    }

    // 默认子目录为 'picture'
    let subDir = 'picture';

    // 根据文件后缀名确定子目录
    switch (fileExtension) {
        case '.mp4':
            subDir = 'video';
            break;
        case '.mp3':
            subDir = 'audio';
            break;
        case '.pdf':
        case '.doc':
        case '.docx':
        case '.txt':
        case '.md':
            subDir = 'document';
            break;
        case '.java':
        case '.py':
            subDir = 'code';
            break;
    }

    // 检查文件大小是否符合要求
    if (file.size > maxFileSize) {
        throw new Error('File size exceeds the limit');
    }

    return subDir;
};


/**
 * 上传文件
 * @param file 文件对象
 * @param uploadDir 上传目录
 * @returns 上传后的文件路径
 */
export const uploadFile = async (file: File, baseUploadDir: string): Promise<string> => {
    const fileExtension = getFileExtension(file.name);
    // 获取子目录
    const subDir = validateFile(file);

    // 拼接上传目录
    const uploadDir = path.posix.join(baseUploadDir, subDir);

    if (!uploadDir) {
        throw new Error('Upload directory is required');
    }

    // 确保上传目录存在，如果不存在则创建
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }

    // 构造文件路径
    const filePath = path.posix.join(uploadDir, generateUUID() + getFileExtension(file.name));

    // 将文件保存到服务器
    const fileBuffer = await file.arrayBuffer();
    await fs.promises.writeFile(filePath, Buffer.from(fileBuffer));

    return filePath;
};


/**
 * 提取文件后缀名
 * @param fileName 文件名
 * @returns 文件后缀名
 */
export const getFileExtension = (fileName: string) => {
    return path.extname(fileName).toLowerCase();
};


/**
 * 生成 UUID（Universally Unique Identifier）
 * @returns 生成的 UUID 字符串
 */
const generateUUID = (): string => {
    let dt = new Date().getTime();
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
};

