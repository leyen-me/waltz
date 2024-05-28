import ContextService from '@/server/service/ContextService';
const contextService = new ContextService();

export default defineWrappedResponseHandler(async (event) => {
    defineHasAuthority(event, "context:info")

    const { chatId } = getRouterParams(event);
    const result = await contextService.getContextsByChatId(Number(chatId));
    return defineOk({ data: result });
});