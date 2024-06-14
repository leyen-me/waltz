export default class AttachmentNotFoundError extends Error {
    constructor() {
      super("文件未找到");
    }
  }
  