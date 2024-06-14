export default class ChatNoStremError extends Error {
    constructor() {
      super("获取stream流失败");
    }
  }
  