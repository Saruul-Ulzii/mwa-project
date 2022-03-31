const express = require("express");
const router = express.Router();
const gameController = require("../controllers/games.controller");

router.route("/games").get(gameController.getAll);

module.exports = router;
