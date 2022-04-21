const fishRouter = require("./fish");
const distRouter = require("./distribution");
const userRouter = require("./users");

const express = require("express");
const router = express.Router();
router.use(process.env.FISHES_URL, fishRouter);
router.use(process.env.FISHES_URL, distRouter);
router.use(process.env.USERS_URL, userRouter);

module.exports = router;
