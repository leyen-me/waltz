import CategoryService from '@/server/service/CategoryService';

const categoryService = new CategoryService();

export default defineWrappedResponseHandler(async (event) => {

    const result = await categoryService.getAllCategories();
    return defineOk({ data: result });
});
