import DictDataService from '@/server/service/DictDataService';

const dictDataService = new DictDataService();
export default defineWrappedResponseHandler(async (event) => {
    defineHasAuthority(event, "dict:update")

    const { id, ...updatedDictDataData } = await readBody(event);
    await dictDataService.updateDictData(id, updatedDictDataData);
    return defineOk({});
});