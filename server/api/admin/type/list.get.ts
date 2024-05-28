import TypeService from '@/server/service/TypeService';

const typeService = new TypeService();

export default defineWrappedResponseHandler(async (event) => {
    defineHasAuthority(event, "type:list")

    const result = await typeService.getAllTypes();
    return defineOk({ data: result });
});
