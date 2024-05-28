import TypeService from '@/server/service/TypeService';

const typeService = new TypeService();

export default defineWrappedResponseHandler(async (event) => {
    defineHasAuthority(event, "type:delete")
    const ids: number[] = await readBody(event);

    await typeService.deleteTypes(ids);
    return defineOk({});
});