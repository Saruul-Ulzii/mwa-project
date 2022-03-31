const express = require("express");
const path = require("path");

require("dotenv").config();

const app = express();
const configs = process.env;

app.get(configs.ADD_URL, function (req, res) {
  if (req.query && req.query.adder2) {
    let sum = parseInt(req.params.adder1) + parseInt(req.query.adder2);
    res.status(200).json({ Sum: sum });
  } else {
    res.status(404).json({ NotFound: configs.ADDER2_REQUIRED_MESSAGE });
  }
});

const server = app.listen(configs.PORT, function () {
  console.log(configs.LISTENING_PORT_MESSAGE, configs.PORT);
});
