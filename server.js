const express = require("express");
const dotenv = require("dotenv");
const middleware = require("./middleware/middleware");
const ErrorHandlingMiddleware = require("./middleware/error-handling");

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

const PlansController = require("./controllers/plans-controller");
const SubscriptionController = require("./controllers/subscription-controller");

middleware(app);

app.use("/api/plans", PlansController);
app.use("/api/subscriptions", SubscriptionController);

ErrorHandlingMiddleware(app);

app.listen(PORT, () => {
  console.log(`Server listing on PORT ${PORT}`);
});
