import fs from 'fs';
import path from 'path';
import mime from 'mime';


/**
 * 获取文件的 MIME 类型
 * @param file 文件对象
 * @returns MIME 类型
 */
const getFileMimeType = (file: File): string => {
    return mime.getType(file.name) || '';
};


/**
 * 验证上传文件是否符合要求，并返回对应的子目录
 * @param file 文件对象
 * @returns 子目录名称
 */
export const defineValidateFile = (file: File): string => {

    const maxFileSize = 1024 * 1024 * 1024; // 1GB

    const mimeType = getFileMimeType(file);

    const allowedMimeTypes = [
        // 图像文件
        'image/jpeg',
        'image/png',
        'image/gif',
        'image/bmp',
        'image/webp',
        'image/tiff',

        // 文档文件
        'text/markdown',
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.template',
        'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        'application/vnd.ms-excel',
        'application/vnd.ms-powerpoint',
        'application/vnd.oasis.opendocument.text',
        'application/vnd.oasis.opendocument.spreadsheet',
        'application/vnd.oasis.opendocument.presentation',

        // 音频文件
        'audio/mpeg',
        'audio/mp4',
        'audio/wav',
        'audio/ogg',
        'audio/aac',

        // 视频文件
        'video/mp4',
        'video/avi',
        'video/x-msvideo',
        'video/mpeg',
        'video/x-flv',
        'video/quicktime',
        'video/x-ms-wmv',

        // 压缩文件
        'application/zip',
        'application/x-rar-compressed',
        'application/x-tar',
        'application/x-7z-compressed',

        // 代码文件
        'text/plain', // 文本文件
        'text/html', // HTML 文件
        'text/css', // CSS 文件
        'application/javascript', // JavaScript 文件
        'application/xml', // XML 文件
        'application/sql', // SQL 文件
        'text/csv', // CSV 文件
        'application/json', // JSON 文件
        'text/x-java-source', // Java 文件
        'text/x-python', // Python 文件
        'text/x-go', // Go 文件
        'text/x-c', // C 文件
        'text/x-c++', // C++ 文件
        'text/x-csharp', // C# 文件
        'application/x-swift', // Swift 文件
        'text/x-ruby', // Ruby 文件
        'application/x-php', // PHP 文件
        'application/x-typescript', // TypeScript 文件
        'text/x-rust', // Rust 文件
        'text/x-kotlin', // Kotlin 文件
        'application/dart', // Dart 文件
        'text/x-shellscript', // Shell 脚本
        'text/x-powershell', // PowerShell 脚本
        'text/x-lua', // Lua 文件
        'text/x-perl', // Perl 文件
        'text/x-scala', // Scala 文件
        'text/x-objectivec', // Objective-C 文件
        'text/x-r-source', // R 文件
        'text/x-matlab', // MATLAB 文件
        'text/x-erlang', // Erlang 文件
        'text/x-haskell', // Haskell 文件
        'text/x-scheme', // Scheme 文件

        // 应用文件
        'application/vnd.android.package-archive', // APK 文件
        'application/octet-stream',//EXE文件
    ];


    if (!allowedMimeTypes.includes(mimeType)) {
        throw new Error('Invalid file type');
    }

    if (file.size > maxFileSize) {
        throw new Error('File size exceeds the limit');
    }
    return mimeType;
};

export const defineCreateFolder = async (createDir: string): Promise<void> => {
    if (!fs.existsSync(createDir)) {
        fs.mkdirSync(createDir, { recursive: true });
    }
}

/**
 * 上传文件
 * @param file 文件对象
 * @param uploadDir 上传目录
 * @returns 上传后的文件路径
 */
export const defineUploadFile = async (file: File, baseUploadDir: string): Promise<string> => {
    const { NUXT_API_UPLOAD_BASE } = useRuntimeConfig().public;
    if (!fs.existsSync(baseUploadDir)) {
        fs.mkdirSync(baseUploadDir, { recursive: true });
    }
    const filePath = baseUploadDir + (generateUUID().replaceAll("-", "")) + defineGetFileExtension(file.name);
    const fileBuffer = await file.arrayBuffer();
    await fs.promises.writeFile(filePath, Buffer.from(fileBuffer));
    return filePath.replace(NUXT_API_UPLOAD_BASE, "");
};


/**
 * 提取文件后缀名
 * @param fileName 文件名
 * @returns 文件后缀名
 */
export const defineGetFileExtension = (fileName: string): string => {
    return path.extname(fileName).toLowerCase();
};

/**
 * 删除文件
 * @param filePath 文件路径
 */
export const defineDeleteFile = (filePath: string): void => {
    if (fs.existsSync(filePath)) {
        fs.rmSync(filePath, { recursive: true, force: true });
    }
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

