import CategoryService from '@/server/service/CategoryService';

const categoryService = new CategoryService();

export default defineWrappedResponseHandler(async (event) => {
    defineHasAuthority(event, "category:page")

    const query: CategoryQuery = getQuery(event);
    const result = await categoryService.selectPage(query);
    return defineOk({ data: result });
});
