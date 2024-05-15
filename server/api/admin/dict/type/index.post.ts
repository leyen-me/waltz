import DictTypeService from "@/server/service/DictTypeService";

const dictTypeService = new DictTypeService();
export default defineWrappedResponseHandler(async (event) => {
    defineHasAuthority(event, "dict:save")

    const dictTypeData = await readBody(event);
    const result = await dictTypeService.createDictType(dictTypeData);
    return defineOk({ data: result });
});
