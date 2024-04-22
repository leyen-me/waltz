const { spawn } = require("child_process");
const fs = require("fs");
const path = require("path");

const cmd = spawn("cmd", ["/c", "pnpm", "start"]);
const filePath = path.join(__dirname, "../pages", "index.vue");
const fileContent = fs.readFileSync(filePath, "utf8");

cmd.stdout.on("data", (data) => {
  let res = String(data).includes("Nuxt Nitro server built in");
  let newContent = null;
  console.log(`${data}`);
  if (res) {
    if (fileContent.includes("01")) {
      newContent = fileContent.replace("01", "02");
    } else if (fileContent.includes("02")) {
      newContent = fileContent.replace("02", "01");
    } else {
      console.log("没有01或者02");
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
