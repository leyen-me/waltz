import fs from "fs";
import mime from "mime";

export default defineWrappedResponseHandler(async (event) => {
  const { mime: _mime, name } = getRouterParams(event);
  const { NUXT_API_UPLOAD_BASE } = useRuntimeConfig().public;

  const path = NUXT_API_UPLOAD_BASE + `/${_mime}/` + name;
  const imageData = fs.readFileSync(path);
  event.res.setHeader("Content-Type", mime.getType(path) as string);
  event.res.end(imageData);
});
