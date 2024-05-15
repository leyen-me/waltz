import DictTypeService from '@/server/service/DictTypeService';

const dictTypeService = new DictTypeService();

export default defineWrappedResponseHandler(async (event) => {
    defineHasAuthority(event, "dict:page")

    const query: DictTypeQuery = getQuery(event);
    const result = await dictTypeService.selectPage(query);
    return defineOk({ data: result });
});
