import DictTypeService from '@/server/service/DictTypeService';

const dictTypeService = new DictTypeService();

export default defineWrappedResponseHandler(async (event) => {
    const result = await dictTypeService.getDictList();
    return defineOk({ data: result });
});