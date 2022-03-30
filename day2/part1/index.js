const http = require("http");
const fs = require("fs");
const path = require("path");

require("dotenv").config();

let pageBuffer;
let statusCode;

const configs = process.env;

const requestHandler = function (req, res) {
  if (req.method == "POST") {
    res.setHeader("Content-Type", "application/json");
    res.writeHead(200);
    res.end('{"isJson": true}');
    return;
  }

  switch (req.url) {
    case configs.PAGE1_URL:
      pageFetcher(configs.PAGE1_PATH, res);
      break;
    case configs.PAGE2_URL:
      pageFetcher(configs.PAGE2_PATH, res);
      break;
    default:
      pageFetcher(configs.INDEX_PATH, res);
      break;
  }
};

const pageFetcher = function (pathToPage, res) {
  fs.readFile(path.join(__dirname, pathToPage), function (err, buffer) {
    if (err) {
      pageBuffer = configs.CONTACT_ADMIN_MESSAGE;
      statusCode = 404;
    } else {
      pageBuffer = buffer;
      statusCode = 200;
    }

    res.setHeader("Content-Type", "text/html");
    res.writeHead(statusCode);
    res.end(pageBuffer);
  });
};

const server = http.createServer(requestHandler);

server.listen(configs.PORT, function () {
  console.log(configs.SERVER_RUNNING_ON_PORT_MESSAGE, configs.PORT);
});
