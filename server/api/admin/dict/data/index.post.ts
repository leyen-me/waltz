import DictDataService from "@/server/service/DictDataService";

const dictDataService = new DictDataService();
export default defineWrappedResponseHandler(async (event) => {
    defineHasAuthority(event, "dict:save")

    const dictDataData = await readBody(event);
    const result = await dictDataService.createDictData(dictDataData);
    return defineOk({ data: result });
});
