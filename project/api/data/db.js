const mongoose = require("mongoose");
require("./game.model");
require("./user.model");

mongoose.connect(process.env.DB_URL);

mongoose.connection.on("connected", function () {
  console.log(process.env.DB_CONNECTION_SUCCESS_MESSAGE);
});

mongoose.connection.on("disconnected", function () {
  console.log(process.env.DB_CONNECTION_DISCONNECTED_MESSAGE);
});

mongoose.connection.on("error", function () {
  console.log(process.env.DB_CONNECTION_ERROR_MESSAGE);
});

process.on("SIGINT", function () {
  mongoose.connection.close(function () {
    console.log(process.env.SIGINT_MESSAGE);
    process.exit(0);
  });
});

process.once("SIGUSR2", function (err) {
  mongoose.connection.close(function () {
    console.log(process.env.SIGUSR2_MESSAGE);
    process.kill(process.pid, "SIGUSR2");
  });
});
