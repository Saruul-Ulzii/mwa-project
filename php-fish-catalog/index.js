require("dotenv").config();
require("./api/data/db");

const express = require("express");
const path = require("path");
const routes = require("./api/route");

const app = express();

app.use("/api", function (req, res, next) {
  console.log(req.method, req.url);
  next();
});

app.use("/api", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "resources")));

app.use(process.env.API_URL, routes);

const server = app.listen(process.env.PORT, function () {
  console.log(process.env.PORT_LISTENING_MESSAGE, process.env.PORT);
});
