import CategoryService from '@/server/service/CategoryService';
const categoryService = new CategoryService();

export default defineWrappedResponseHandler(async (event) => {
    defineHasAuthority(event, "category:update")

    const { id, ...updatedCategoryData } = await readBody(event);
    await categoryService.updateCategory(id, updatedCategoryData);
    return defineOk({});
});