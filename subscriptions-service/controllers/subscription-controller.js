const router = require("express").Router();
const asyncWrapper = require("../../util/async-wrapper").AsyncWrapper;
const SubscriptionService = require("../services/subscription-service");
const ProtectedRoute = require("../middleware/protected-route");

const subscriptionServices = new SubscriptionService();

router.use(ProtectedRoute());

// api/subscriptions
router.get(
  "/",
  asyncWrapper(async (req, res) => {
    let userId = null;
    let subscriptions = await subscriptionServices.findAll(userId);
    res.send(subscriptions);
  })
);

//GET api/subscriptions/:id
router.get(
  "/:id",
  asyncWrapper(async (req, res) => {
    let id = req.params.id;
    let subscription = await subscriptionServices.findOne(id);
    res.send(subscription);
  })
);

//POST api/subscriptions
router.post(
  "/",
  asyncWrapper(async (req, res) => {
    let subscription = await subscriptionServices.create(req.body);
    res.send(subscription);
  })
);

//DELETE api/subscriptions
router.delete(
  "/:id",
  asyncWrapper(async (req, res) => {
    let id = req.params.id;
    await subscriptionServices.deleteOne(id);
    res.sendStatus(200);
  })
);

module.exports = router;
