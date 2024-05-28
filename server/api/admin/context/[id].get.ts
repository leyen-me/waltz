import ContextService from '@/server/service/ContextService';
const contextService = new ContextService();

export default defineWrappedResponseHandler(async (event) => {
    defineHasAuthority(event, "context:info")

    const { id } = getRouterParams(event);
    const result = await contextService.getContextById(Number(id));
    return defineOk({ data: result });
});