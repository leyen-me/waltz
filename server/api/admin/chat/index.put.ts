import ChatService from '@/server/service/ChatService';
const chatService = new ChatService();

export default defineWrappedResponseHandler(async (event) => {
    defineHasAuthority(event, "context:update")

    const { id, ...updatedChatData } = await readBody(event);
    await chatService.updateChat(id, updatedChatData);
    return defineOk({});
});