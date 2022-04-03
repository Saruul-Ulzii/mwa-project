require("dotenv").config();
require("./api/data/db");

const express = require("express");
const routes = require("./api/route");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(process.env.API_URL, routes);

const server = app.listen(process.env.PORT, function () {
  console.log(process.env.PORT_LISTENING_MESSAGE, process.env.PORT);
});
