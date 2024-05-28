import ContextService from '@/server/service/ContextService';

const contextService = new ContextService();

export default defineWrappedResponseHandler(async (event) => {
    defineHasAuthority(event, "context:list")

    const result = await contextService.getAllContexts();
    return defineOk({ data: result });
});
