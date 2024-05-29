import ChatService from '@/server/service/ChatService';
const chatService = new ChatService();

export default defineWrappedResponseHandler(async (event) => {
    defineHasAuthority(event, "context:update")

    const { id, ...updatedChatData } = await readBody(event);
    updatedChatData.userId = event.context.user.id;
    await chatService.updateChat(id, updatedChatData);
    return defineOk({});
});