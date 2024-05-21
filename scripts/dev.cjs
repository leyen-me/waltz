const { spawn } = require("child_process");
const fs = require("fs");
const path = require("path");

const cmd =
  process.platform === "win32"
    ? spawn("cmd", ["/c", "pnpm dev-nuxt"])
    : spawn("sh", ["-c", "pnpm dev-nuxt"]);
const filePath = path.join(__dirname, "../pages", "index.vue");
const fileContent = fs.readFileSync(filePath, "utf8");

cmd.stdout.on("data", (data) => {
  let res = String(data).includes("Nuxt Nitro server built in");
  let newContent = null;
  console.log(`${data}`);
  if (res) {
    if (fileContent.includes("001")) {
      newContent = fileContent.replace("001", "002");
    } else if (fileContent.includes("002")) {
      newContent = fileContent.replace("002", "001");
    } else {
      console.log("没有001或者002");
    }
    fs.writeFileSync(filePath, newContent);
  }
});

cmd.stderr.on("data", (data) => {
  console.error(`${data}`);
});

cmd.on("close", (code) => {
  console.log(`${code}`);
});
