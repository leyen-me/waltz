import DictDataService from '@/server/service/DictDataService';

const dictDataService = new DictDataService();

export default defineWrappedResponseHandler(async (event) => {
    defineHasAuthority(event, "dict:page")

    const query: DictDataQuery = getQuery(event);
    const result = await dictDataService.selectPage(query);
    return defineOk({ data: result });
});
