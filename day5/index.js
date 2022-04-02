require("dotenv").config();
require("./data/db");
const express = require("express");
const path = require("path");
const routes = require("./routes");

const configs = process.env;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(configs.API_URL, routes);

app.listen(configs.PORT, function () {
  console.log(configs.LISTENING_PORT_MESSAGE, configs.PORT);
});
