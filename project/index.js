require("dotenv").config();
require("./api/data/db");
const { urlencoded } = require("express");
const express = require("express");
const path = require("path");

const routes = require("./api/routes");

const app = express();
const configs = process.env;

app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, configs.RESOURCE_PATH)));
app.use(configs.API_URL, routes);

app.get(configs.INDEX_URL, function (req, res) {
  res.status(200).sendFile(path.join(__dirname, configs.INDEX_PATH));
});

app.get("*", function (req, res) {
  res.status(200).sendFile(path.join(__dirname, configs.INDEX_PATH));
});

const server = app.listen(configs.PORT, function () {
  console.log(configs.SERVER_RUNNING_ON_PORT_MESSAGE, configs.PORT);
});
