const { spawn } = require("child_process");
const fs = require("fs");
const path = require("path");

const cmd =
  process.platform === "win32"
    ? spawn("cmd", ["/c", "npm run build-nuxt"])
    : spawn("sh", ["-c", "npm run build-nuxt"]);

cmd.stdout.on("data", (data) => {
  console.log(`${String(data)}`);
});

cmd.stderr.on("data", (data) => {
  console.error(`${data}`);
});

cmd.on("close", (code) => {
  console.log(`${code}`);
});
