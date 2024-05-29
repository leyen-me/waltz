import ChatService from '@/server/service/ChatService';
const chatService = new ChatService();

export default defineWrappedResponseHandler(async (event) => {
  const { chatId, prompt } = await readBody(event);
  const stream = await chatService.getStream(chatId,prompt);
  return new Response(stream);
});
