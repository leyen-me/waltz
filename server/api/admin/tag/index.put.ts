import TagService from '@/server/service/TagService';
const tagService = new TagService();

export default defineWrappedResponseHandler(async (event) => {
    defineHasAuthority(event, "tag:update")

    const { id, ...updatedTagData } = await readBody(event);
    await tagService.updateTag(id, updatedTagData);
    return defineOk({});
});