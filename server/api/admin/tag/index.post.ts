import TagService from '@/server/service/TagService';

const tagService = new TagService();

export default defineWrappedResponseHandler(async (event) => {
    defineHasAuthority(event, "tag:save")

    const tagData = await readBody(event);
    const result = await tagService.createTag(tagData);
    return defineOk({ data: result });
});