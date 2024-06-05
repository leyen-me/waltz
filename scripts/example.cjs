const { spawn } = require("child_process");

const cmd =
  process.platform === "win32"
    ? spawn("cmd", ["/c", "pnpm build-nuxt-example"])
    : spawn("sh", ["-c", "pnpm build-nuxt-example"]);

cmd.stdout.on("data", (data) => {
  console.log(`${String(data)}`);
});

cmd.stderr.on("data", (data) => {
  console.error(`${data}`);
});

cmd.on("close", (code) => {
  console.log(`${code}`);
});
