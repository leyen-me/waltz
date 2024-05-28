import TypeService from '@/server/service/TypeService';
const typeService = new TypeService();

export default defineWrappedResponseHandler(async (event) => {
    defineHasAuthority(event, "type:info")

    const { id } = getRouterParams(event);
    const result = await typeService.getTypeById(Number(id));
    return defineOk({ data: result });
});