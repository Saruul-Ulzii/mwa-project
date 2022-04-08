require("dotenv").config();
require("./api/data/db");
const express = require("express");
const path = require("path");
const routes = require("./api/routes");

const config = process.env;

const app = express();

app.use(process.env.API_URL, function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, process.env.RESOURCES_PATH)));

app.use(function (req, res, next) {
  console.log(req.method, req.url);
  next();
});

app.use(process.env.API_URL, routes);

app.listen(config.PORT, function () {
  console.log(config.PORT_LISTENING_MESSAGE, config.PORT);
});
