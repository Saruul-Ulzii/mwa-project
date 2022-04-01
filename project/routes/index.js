const express = require("express");
const router = express.Router();
const gameController = require("../controllers/games.controller");

router
  .route(process.env.GAMES_URL)
  .get(gameController.getAll)
  .post(gameController.addOne);

router
  .route(process.env.GAME_BY_ID_URL)
  .get(gameController.getOne)
  .delete(gameController.deleteOne);

module.exports = router;
