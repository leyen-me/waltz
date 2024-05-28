import ContextService from '@/server/service/ContextService';
const contextService = new ContextService();

export default defineWrappedResponseHandler(async (event) => {
    defineHasAuthority(event, "context:update")

    const { id, ...updatedContextData } = await readBody(event);
    await contextService.updateContext(id, updatedContextData);
    return defineOk({});
});