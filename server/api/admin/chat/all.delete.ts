import ChatService from '@/server/service/ChatService';

const chatService = new ChatService();

export default defineWrappedResponseHandler(async (event) => {
    defineHasAuthority(event, "chat:delete")
    const userId = event.context.user.id;
    await chatService.deleteAllChat(userId);
    return defineOk({});
});