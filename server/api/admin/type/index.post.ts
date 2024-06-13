import TypeService from '@/server/service/TypeService';

const typeService = new TypeService();

export default defineWrappedResponseHandler(async (event) => {
    defineHasAuthority(event, "type:save")

    const typeData = await readBody(event);
    
    const userId: number | null = event.context.user.id;
    if (userId) {
        typeData.userId = userId;
    }

    const result = await typeService.createType(typeData);
    return defineOk({ data: result });
});