const mongoose = require("mongoose");
require("./student.model");

mongoose.connect(process.env.DB_URL);

mongoose.connection.on("connected", function () {
  console.log(process.env.DB_CONNECTED_MESSAGE);
});
