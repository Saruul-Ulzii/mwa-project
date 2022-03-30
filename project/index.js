const http = require("http");
const fs = require("fs");
const path = require("path");

let pageBuffer;
let statusCode;

const requestHandler = function (req, res) {
  switch (req.url) {
    case "/page1":
      pageFetcher("page1", res);
      break;
    case "/page2":
      pageFetcher("page2", res);
      break;

    default:
      pageFetcher("index", res);
      break;
  }
};

const pageFetcher = function (pathToPage, res) {
  fs.readFile(path.join(__dirname, pathToPage), function (err, buffer) {
    if (err) {
      pageBuffer = "Oops! Please contact admin!";
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
