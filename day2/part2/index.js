const express = require("express");
const path = require("path");
require("dotenv").config();

const app = express();
const configs = process.env;

app.get(configs.INDEX_URL, function (req, res) {
  res.status(200).sendFile(path.join(__dirname, configs.INDEX_PATH));
});

app.get(configs.PAGE1_URL, function (req, res) {
  res.status(200).sendFile(path.join(__dirname, configs.PAGE1_PATH));
});

app.get(configs.PAGE2_URL, function (req, res) {
  res.status(200).sendFile(path.join(__dirname, configs.PAGE2_PATH));
});

app.get("*", function (req, res) {
  res.status(200).sendFile(path.join(__dirname, configs.INDEX_PATH));
});

app.post(configs.POST_URL, function (req, res) {
  res.json({ isJson: true });
});

const server = app.listen(configs.PORT, function () {
  console.log(configs.SERVER_RUNNING_ON_PORT_MESSAGE, configs.PORT);
});
