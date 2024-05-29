import ChatService from '@/server/service/ChatService';
const chatService = new ChatService();

export default defineWrappedResponseHandler(async (event) => {
    const { chatId } = await readBody(event);
    const stream = await chatService.resume(chatId);
    return defineOk({});
});
