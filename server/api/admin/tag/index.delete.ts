import TagService from '@/server/service/TagService';

const tagService = new TagService();

export default defineWrappedResponseHandler(async (event) => {
    defineHasAuthority(event, "tag:delete")
    const ids: number[] = await readBody(event);

    await tagService.deleteTags(ids);
    return defineOk({});
});