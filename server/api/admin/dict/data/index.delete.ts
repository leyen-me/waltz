import DictDataService from '@/server/service/DictDataService';

const dictDataService = new DictDataService();

export default defineWrappedResponseHandler(async (event) => {
    defineHasAuthority(event, "dict:delete")
    const ids: number[] = await readBody(event);

    await dictDataService.deleteDictData(ids);
    return defineOk({});
});