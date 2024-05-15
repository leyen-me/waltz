import DictTypeService from '@/server/service/DictTypeService';
const dictTypeService = new DictTypeService();

export default defineWrappedResponseHandler(async (event) => {
    defineHasAuthority(event, "dict:info")
    const { id } = getRouterParams(event);

    const result = await dictTypeService.getDictTypeById(id);
    return defineOk({ data: result });
});