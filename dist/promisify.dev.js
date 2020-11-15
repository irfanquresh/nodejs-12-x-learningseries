"use strict";

var util = require("util");

var fs = require("fs");

fs.readFile("./hello_world.txt", "utf-8", function (err, text) {
  if (err) {
    console.log(err);
  } else {
    console.log(text);
  }
});
var readFile = util.promisify(fs.readFile);
readFile("./hello_world.txt", "utf-8").then(function (text) {
  console.log(text);
})["catch"](function (err) {
  console.log(err);
});