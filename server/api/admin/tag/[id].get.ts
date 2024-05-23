import TagService from '@/server/service/TagService';
const tagService = new TagService();

export default defineWrappedResponseHandler(async (event) => {
    defineHasAuthority(event, "tag:info")

    const { id } = getRouterParams(event);
    const result = await tagService.getTagById(id);
    return defineOk({ data: result });
});