"use strict";

var HTTP = require("http");

var FS = require("fs");

var PATH = require("path");

var MIME = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.txt': 'text/plain'
};
HTTP.createServer(function (req, res) {
  console.log(req.url);
  var EXTENSION = PATH.extname(req.url);

  if (req.method === "GET") {
    if (req.url === "/") {
      FS.readFile("./public/index.html", "utf-8", function (err, data) {
        if (err) {
          console.error(err);
          res.writeHead(404);
          res.end("Not Found ");
          return;
        }

        res.writeHead(200, {
          'Content-Type': 'text/html; charset=utf-8'
        });
        res.end(data);
      });
    } else if (req.url === '/favicon.ico') {
      FS.readFile("./src/assets/icon".concat(req.url), function (err, data) {
        res.writeHead(200, {
          'Content-Type': 'image/x-icon'
        });
        res.end(data);
      });
    } else if (MIME[EXTENSION]) {
      FS.readFile(".".concat(req.url), "utf-8", function (err, data) {
        if (err) {
          console.error(err);
          res.writeHead(404);
          res.end("Not Found ");
          return;
        }

        res.writeHead(200, {
          'Content-Type': MIME[EXTENSION] + '; charset=utf-8'
        });
        res.end(data);
      });
    } else {
      res.writeHead(404);
      res.end("Not Found ");
    }
  }
}).listen(8080, function () {
  console.log("8080\uBC88 \uD3EC\uD2B8\uC5D0\uC11C \uC11C\uBC84 \uB300\uAE30 \uC911\uC785\uB2C8\uB2E4.");
});