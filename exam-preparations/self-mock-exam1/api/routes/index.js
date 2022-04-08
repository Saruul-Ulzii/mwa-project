const express = require("express");
const router = express.Router();
const gamesController = require("../controllers/games.controller");

router
  .route(process.env.GAMES_URL)
  .get(gamesController.getAll)
  .post(gamesController.addOne);
router
  .route(process.env.PER_GAME_URL)
  .delete(gamesController.deleteOne)
  .put(gamesController.updateOne)
  .patch(gamesController.updateOne);

module.exports = router;
