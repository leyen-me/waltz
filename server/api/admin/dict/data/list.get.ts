import DictDataService from '@/server/service/DictDataService';

const dictDataService = new DictDataService();

export default defineWrappedResponseHandler(async (event) => {
    defineHasAuthority(event, "dict:list")
    const { typeId } = getQuery(event);
    const result = await dictDataService.getAllDictDataByType(typeId as number);
    return defineOk({ data: result });
});
