const CommonMiddleware = require("./common");

module.exports = function MiddleWare(app) {
  CommonMiddleware(app);
};
