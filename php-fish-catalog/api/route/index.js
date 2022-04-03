const express = require("express");
const router = express.Router();
const fishController = require("../controller/fish.controller");
const distController = require("../controller/distribution.controller");

router
  .route(process.env.FISHES_URL)
  .get(fishController.getAll)
  .post(fishController.addOne);

router
  .route(process.env.ONE_FISH_URL)
  .get(fishController.getOne)
  .put(fishController.update)
  .delete(fishController.deleteOne);

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
