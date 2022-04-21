const mongoose = require("mongoose");
require("./fish.model");
require("./user.model");

mongoose.connect(process.env.DB_URL);

mongoose.connection.on(process.env.DB_CONNECTED, function () {
  console.log(process.env.DB_CONNECTED_MESSAGE, process.env.DB_URL);
});

mongoose.connection.on(process.env.DB_DISCONNECTED, function () {
  console.log(process.env.DB_DISCONNECTED_MESSAGE);
});

mongoose.connection.on(process.env.DB_ERROR, function () {
  console.log(process.env.DB_ERROR_MESSAGE);
});

process.on(process.env.SIGNAL_INTERRUPT_VALUE, function () {
  mongoose.connection.close(function () {
    console.log(process.env.APP_TERMINATED_MESSAGE);
    process.exit(0);
  });
});

process.once(process.env.SIGNAL_RESTARTED_VALUE, function () {
  mongoose.connection.close(function () {
    console.log(process.env.APP_RESTARTED_MESSAGE);
    process.kill(process.pid, process.env.SIGNAL_RESTARTED_VALUE);
  });
});
