import TypeService from '@/server/service/TypeService';

const typeService = new TypeService();

export default defineWrappedResponseHandler(async (event) => {
    defineHasAuthority(event, "type:save")

    const tagData = await readBody(event);
    const result = await typeService.createType(tagData);
    return defineOk({ data: result });
});