import AttachmentService from "@/server/service/AttachmentService";

const attachmentService = new AttachmentService();

export default defineWrappedResponseHandler(async (event) => {
    const { id } = getRouterParams(event);
    const attachment = await attachmentService.downloadFiles(Number(id));

    if (attachment) {
        const headers = new Headers();
        headers.set("Content-Type", attachment.type);

        const response = new Response(attachment.data, {
            status: 200,
            headers: headers,
        });
        event.respondWith(response);
    } else {
        const response = new Response("您要下载的文件走丢啦", {
            status: 404,
        });
        event.respondWith(response);
    }
});
