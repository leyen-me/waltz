import CategoryService from '@/server/service/CategoryService';

const categoryService = new CategoryService();

export default defineWrappedResponseHandler(async (event) => {
    defineHasAuthority(event, "category:delete")
    const ids: number[] = await readBody(event);

    await categoryService.deleteCategories(ids);
    return defineOk({});
});