import TagService from '@/server/service/TagService';

const tagService = new TagService();

export default defineWrappedResponseHandler(async (event) => {

    const result = await tagService.getAllTags();
    return defineOk({ data: result });
});
