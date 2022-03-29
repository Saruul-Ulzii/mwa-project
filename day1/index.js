const child_process = require("child_process");

const newProcess1 = child_process.spawn("node", ["fibonacci.js", 30], {
  stdio: "inherit",
});
const newProcess2 = child_process.spawn("node", ["fibonacci.js", -15], {
  stdio: "inherit",
});
