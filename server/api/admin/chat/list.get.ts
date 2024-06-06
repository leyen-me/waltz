import ChatService from '@/server/service/ChatService';

const chatService = new ChatService();

export default defineWrappedResponseHandler(async (event) => {
    defineHasAuthority(event, "chat:list")

    const userId = event.context.user.id;
    const result = await chatService.getAllChats(Number(userId));
    return defineOk({ data: result });
});
