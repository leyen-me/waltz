import ContextService from '@/server/service/ContextService';

const contextService = new ContextService();

export default defineWrappedResponseHandler(async (event) => {
    defineHasAuthority(event, "context:save")

    const tagData = await readBody(event);
    const result = await contextService.createContext(tagData);
    return defineOk({ data: result });
});