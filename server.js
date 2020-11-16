const express = require("express");
const middleware = require("./middleware/middleware");
const dotenv = require("dotenv");

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();


const PlansController = require("./controllers/plans-controller");
const SubscriptionController = require("./controllers/subscription-controller");

middleware(app);

app.use("/api/plans", PlansController);
app.use("/api/subscriptions", SubscriptionController);

app.listen(PORT, () => {
  console.log(`Server listing on PORT ${PORT}`);
});
