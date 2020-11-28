const router = require("express").Router();
const asyncWrapper = require("../../util/async-wrapper").AsyncWrapper;
const PlansService = require("../services/plans-service");
const validator = require("../middleware/validator");
const ProtectedRoute = require("../middleware/protected-route");

const planServices = new PlansService();

router.use(ProtectedRoute());

// api/plans
router.get(
  "/",
  asyncWrapper(async (req, res) => {
    let userId = req.user;
    let plans = await planServices.findAll(userId);
    res.send(plans);
  })
);

//GET api/plans/:id
router.get(
  "/:id",
  asyncWrapper(async (req, res) => {
    let id = req.params.id;
    let plan = await planServices.findOne(id);
    res.send(plan);
  })
);

//POST api/plans
router.post(
  "/",
  [validator("Plan")],
  asyncWrapper(async (req, res) => {
    let plan = req.body;
    let userId = req.user;
    plan.userId = userId;
    plan = await planServices.create(plan);
    res.send(plan);
  })
);

//DELETE api/plans
router.delete(
  "/:id",
  asyncWrapper(async (req, res) => {
    let id = req.params.id;
    await planServices.deleteOne(id);
    res.sendStatus(200);
  })
);

module.exports = router;
