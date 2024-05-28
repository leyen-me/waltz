import ChatService from '@/server/service/ChatService';

const chatService = new ChatService();

export default defineWrappedResponseHandler(async (event) => {
    defineHasAuthority(event, "chat:list")

    const result = await chatService.getAllChats();
    return defineOk({ data: result });
});
