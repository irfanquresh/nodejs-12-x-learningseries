const express = require("express");
const middleware = require("../middleware/middleware");
const ErrorHandlingMiddleware = require("../middleware/error-handling");
const AuthMiddleware = require("./middleware/auth");

const PORT = process.env.PORT;

const app = express();

const PlansController = require("./controllers/plans-controller");

middleware(app);
AuthMiddleware(app);
app.use("", PlansController);
ErrorHandlingMiddleware(app);

app.listen(PORT, () => {
  console.log(`Plan Service listing on PORT ${PORT}`);
});
