const mongoose = require("mongoose");
require("./game.model");

mongoose.connect(process.env.DB_URL);

mongoose.connection.on(process.env.CONNECTED, function () {
  console.log(process.env.DB_CONNECTED, process.env.DB_URL);
});

mongoose.connection.on(process.env.DISCONNECTED, function () {
  console.log(process.env.DB_DISCONNECTED);
});

mongoose.connection.on(process.env.ERROR, function () {
  console.log(process.env.DB_ERROR);
});

process.on("SIGINT", function () {
  mongoose.connection.close(function () {
    console.log(process.env.APP_INTERRUPTED);
    process.exit(0);
  });
});

process.once("SIGUSR2", function () {
  mongoose.connection.close(function () {
    console.log(process.env.APP_TERMINATED);
    process.kill(process.pid, "SIGUSR2");
  });
});
