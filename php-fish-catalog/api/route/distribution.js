const express = require("express");
const router = express.Router();
const distController = require("../controller/distribution.controller");

router
  .route(process.env.DISTRIBUTIONS_URL)
  .get(distController.getAll)
  .post(distController.addOne);

router
  .route(process.env.ONE_DISTRIBUTION_URL)
  .get(distController.getOne)
  .put(distController.update)
  .delete(distController.deleteOne);

module.exports = router;
