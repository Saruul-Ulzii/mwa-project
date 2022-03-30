const express = require("express");
const path = require("path");
require("dotenv").config();

const app = express();
const configs = process.env;

app.use(express.static(path.join(__dirname, configs.RESOURCE_PATH)));

app.get(configs.INDEX_URL, function (req, res) {
  res.status(200).sendFile(path.join(__dirname, configs.INDEX_PATH));
});

app.get("*", function (req, res) {
  res.status(200).sendFile(path.join(__dirname, configs.INDEX_PATH));
});

const server = app.listen(configs.PORT, function () {
  console.log(configs.SERVER_RUNNING_ON_PORT_MESSAGE, configs.PORT);
});