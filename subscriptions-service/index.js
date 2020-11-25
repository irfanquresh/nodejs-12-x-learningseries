const express = require("express");
const middleware = require("../middleware/middleware");
const ErrorHandlingMiddleware = require("../middleware/error-handling");

const PORT = process.env.PORT;

const app = express();

const SubscriptionController = require("./controllers/subscription-controller");

middleware(app);
app.use("", SubscriptionController);
ErrorHandlingMiddleware(app);

app.listen(PORT, () => {
  console.log(`Subscription service listing on PORT ${PORT}`);
});
