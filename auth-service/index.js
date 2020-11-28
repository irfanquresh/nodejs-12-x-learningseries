const express = require("express");
const middleware = require("../middleware/middleware");
const ErrorHandlingMiddleware = require("../middleware/error-handling");

const PORT = process.env.PORT;

const app = express();

const UsersController = require("./controllers/users-controller");

middleware(app);
app.use("", UsersController);
ErrorHandlingMiddleware(app);

app.listen(PORT, () => {
  console.log(`User Service listing on PORT ${PORT}`);
});
