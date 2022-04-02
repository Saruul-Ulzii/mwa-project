const express = require("express");
const router = express.Router();
const gameController = require("../controllers/games.controller");
const publisherController = require("../controllers/publishers.controller");
const reviewController = require("../controllers/reviews.controller");

router
  .route(process.env.GAMES_URL)
  .get(gameController.getAll)
  .post(gameController.addOne);

router
  .route(process.env.GAME_BY_ID_URL)
  .get(gameController.getOne)
  .delete(gameController.deleteOne);

router.route(process.env.GAME_PUBLISHER_URL).get(publisherController.getOne);

router.route(process.env.GAME_REVIEWS_URL).get(reviewController.getAll);
router.route(process.env.GAME_ONE_REVIEW_URL).get(reviewController.getOne);

module.exports = router;
