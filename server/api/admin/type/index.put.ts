import TypeService from '@/server/service/TypeService';
const typeService = new TypeService();

export default defineWrappedResponseHandler(async (event) => {
    defineHasAuthority(event, "type:update")

    const { id, ...updatedTypeData } = await readBody(event);

    const userId: number | null = event.context.user.id;
    if (userId) {
        updatedTypeData.userId = userId;
    }
    await typeService.updateType(id, updatedTypeData);
    return defineOk({});
});