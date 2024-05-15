import DictTypeService from '@/server/service/DictTypeService';

const dictTypeService = new DictTypeService();
export default defineWrappedResponseHandler(async (event) => {
    defineHasAuthority(event, "dict:update")

    const { id, ...updatedDictTypeData } = await readBody(event);
    await dictTypeService.updateDictType(id, updatedDictTypeData);
    return defineOk({});
});