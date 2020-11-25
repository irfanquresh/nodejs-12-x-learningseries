const router = require("express").Router();
const asyncWrapper = require("../../util/async-wrapper").AsyncWrapper;
const PlansService = require("../services/plans-service");
const validator = require("../middleware/validator");

const planServices = new PlansService();

// api/plans
router.get(
  "/",
  asyncWrapper(async (req, res) => {
    let userId = null;
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
    let plan = await planServices.create(req.body);
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
