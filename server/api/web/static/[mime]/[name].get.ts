import fs from "fs";
import mime from "mime";
import { baseUploadDir } from "~/server/config";

export default defineWrappedResponseHandler(async (event) => {
  const { mime: _mime, name } = getRouterParams(event);
  const path = baseUploadDir + `/${_mime}/` + name;
  const imageData = fs.readFileSync(path);
  event.res.setHeader("Content-Type", mime.getType(path) as string);
  event.res.end(imageData);
});
