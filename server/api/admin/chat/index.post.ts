import ChatService from '@/server/service/ChatService';

const chatService = new ChatService();

export default defineWrappedResponseHandler(async (event) => {
    defineHasAuthority(event, "chat:save")

    const chatData = await readBody(event);
    chatData.userId = event.context.user.id;
    const result = await chatService.createChat(chatData);
    return defineOk({ data: result });
});