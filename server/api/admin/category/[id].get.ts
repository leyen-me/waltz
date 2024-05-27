import CategoryService from '@/server/service/CategoryService';
const categoryService = new CategoryService();

export default defineWrappedResponseHandler(async (event) => {
    defineHasAuthority(event, "category:info")

    const { id } = getRouterParams(event);
    const result = await categoryService.getCategoryById(Number(id));
    return defineOk({ data: result });
});