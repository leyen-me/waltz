import DictTypeService from '@/server/service/DictTypeService';

const dictTypeService = new DictTypeService();

export default defineWrappedResponseHandler(async (event) => {
    defineHasAuthority(event, "dict:delete")
    const ids: number[] = await readBody(event);

    await dictTypeService.deleteDictType(ids);
    return defineOk({});
});