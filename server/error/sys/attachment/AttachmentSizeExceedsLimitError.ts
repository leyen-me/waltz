export default class AttachmentSizeExceedsLimitError extends Error {
  constructor() {
    super("文件太大了");
  }
}
