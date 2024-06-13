import User from '~/server/models/User';
import TypeService from '~/server/service/TypeService';

const typeService = new TypeService();

export default defineWrappedResponseHandler(async (event) => {
    defineHasAuthority(event, "type:page")
    const userId: number | null = event.context.user.id;
    const query: TypeQuery = getQuery(event);
    if (userId) {
        query.userId = userId;
    }
    const result = await typeService.selectPage(query);
    return defineOk({ data: result });
});
