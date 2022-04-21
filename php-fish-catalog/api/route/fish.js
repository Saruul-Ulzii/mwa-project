const express = require("express");
const router = express.Router();
const fishController = require("../controller/fish.controller");
const authController = require("../controller/auth.controller");

router
  .route("")
  .get(fishController.getAll)
  .post(authController.authenticate, fishController.addOne);

router
  .route(process.env.ONE_FISH_URL)
  .get(fishController.getOne)
  .put(fishController.update)
  .patch(fishController.update)
  .delete(fishController.deleteOne);

module.exports = router;
