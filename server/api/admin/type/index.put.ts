import TypeService from '@/server/service/TypeService';
const typeService = new TypeService();

export default defineWrappedResponseHandler(async (event) => {
    defineHasAuthority(event, "type:update")

    const { id, ...updatedTypeData } = await readBody(event);
    await typeService.updateType(id, updatedTypeData);
    return defineOk({});
});