const child_process = require("child_process");

const fib = function (number) {
  child_process.spawn("node", ["fibonacci.js", number], {
    stdio: "inherit",
  });
};

fib(30);
fib(-15);
fib(15);
