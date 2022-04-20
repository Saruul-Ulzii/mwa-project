const express = require("express");
const router = express.Router();
const gameController = require("../controllers/games.controller");
const publisherController = require("../controllers/publishers.controller");
const reviewController = require("../controllers/reviews.controller");
const authController = require("../controllers/auth.controller");

router
  .route("")
  .get(gameController.getAll)
  .post(authController.authenticate, gameController.addOne);

router
  .route(process.env.GAME_BY_ID_URL)
  .get(gameController.getOne)
  .delete(gameController.deleteOne)
  .put(gameController.updateOne)
  .patch(gameController.updateOne);

router
  .route(process.env.GAME_PUBLISHER_URL)
  .get(publisherController.getOne)
  .put(publisherController.updateOne)
  .patch(publisherController.updateOne);

router.route(process.env.GAME_REVIEWS_URL).get(reviewController.getAll);
router
  .route(process.env.GAME_ONE_REVIEW_URL)
  .get(reviewController.getOne)
  .put(reviewController.updateOne)
  .patch(reviewController.updateOne);

module.exports = router;
