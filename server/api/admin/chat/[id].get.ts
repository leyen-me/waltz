import ChatService from '@/server/service/ChatService';
const chatService = new ChatService();

export default defineWrappedResponseHandler(async (event) => {
    defineHasAuthority(event, "chat:info")

    const { id } = getRouterParams(event);
    const result = await chatService.getChatById(Number(id));
    return defineOk({ data: result });
});