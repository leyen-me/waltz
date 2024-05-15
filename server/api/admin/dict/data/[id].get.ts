import DictDataService from '@/server/service/DictDataService';
const dictDataService = new DictDataService();

export default defineWrappedResponseHandler(async (event) => {
    defineHasAuthority(event, "dict:info")
    const { id } = getRouterParams(event);

    const result = await dictDataService.getDictDataById(id);
    return defineOk({ data: result });
});