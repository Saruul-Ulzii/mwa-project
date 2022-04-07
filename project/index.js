require("dotenv").config();
require("./api/data/db");
const { urlencoded } = require("express");
const express = require("express");
const path = require("path");

const routes = require("./api/routes");

const app = express();
const configs = process.env;

app.use("/api", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, configs.RESOURCE_PATH)));

app.use(function (req, res, next) {
  console.log(req.method, req.url);
  next();
});
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
