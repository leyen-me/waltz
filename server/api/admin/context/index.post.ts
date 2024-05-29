import ContextService from '@/server/service/ContextService';

const contextService = new ContextService();

export default defineWrappedResponseHandler(async (event) => {
    defineHasAuthority(event, "context:save")

    const contextData = await readBody(event);
    const result = await contextService.createContext(contextData);
    return defineOk({ data: result });
});