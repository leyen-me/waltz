import CategoryService from "@/server/service/CategoryService";

const categoryService = new CategoryService();
export default defineWrappedResponseHandler(async (event) => {
    defineHasAuthority(event, "category:save")

    const categoryData = await readBody(event);
    const result = await categoryService.createCategory(categoryData);
    return defineOk({ data: result });
});
