import ContextService from '@/server/service/ContextService';

const contextService = new ContextService();

export default defineWrappedResponseHandler(async (event) => {
    defineHasAuthority(event, "context:delete")
    const ids: number[] = await readBody(event);

    await contextService.deleteContexts(ids);
    return defineOk({});
});