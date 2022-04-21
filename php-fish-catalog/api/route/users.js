const express = require("express");
const router = express.Router();
const userController = require("../controller/users.controller");

router.route("").post(userController.register);
router.route(process.env.USERS_LOGIN_URL).post(userController.login);
module.exports = router;
