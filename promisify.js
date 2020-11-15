const util = require("util");
const fs = require("fs");

fs.readFile("./hello_world.txt", "utf-8", (err, text) => {
  if (err) {
    console.log(err);
  } else {
    console.log(text);
  }
});

const readFile = util.promisify(fs.readFile);
readFile("./hello_world.txt", "utf-8")
  .then((text) => {
    console.log(text);
  })
  .catch((err) => {
    console.log(err);
  });
