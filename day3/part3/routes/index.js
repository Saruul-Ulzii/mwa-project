const express = require("express");
const router = express.Router();
const schoolController = require("../controllers/school.controller");
require("dotenv").config();

router
  .route(process.env.GET_ALL_STUDENTS_URL)
  .get(schoolController.getStudents);
router
  .route(process.env.GET_ONE_STUDENT_URL)
  .get(schoolController.getStudentById);

module.exports = router;
