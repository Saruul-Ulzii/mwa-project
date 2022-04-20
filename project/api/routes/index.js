const gameRouter = require("./games");
const userRouter = require("./users");

const express = require("express");
const router = express.Router();
router.use(process.env.GAMES_URL, gameRouter);
router.use(process.env.USERS_URL, userRouter);

module.exports = router;
