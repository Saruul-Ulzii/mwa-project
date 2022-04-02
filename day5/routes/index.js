const express = require("express");
const router = express.Router();
const studentController = require("../controllers/students.controller");
const courseController = require("../controllers/courses.controller");

router
  .route(process.env.GET_ALL_STUDENTS_URL)
  .get(studentController.getStudents);
router
  .route(process.env.GET_ONE_STUDENT_URL)
  .get(studentController.getStudentById)
  .post(studentController.addOne);
router
  .route(process.env.GET_ONE_STUDENT_COURSES_URL)
  .get(courseController.getCourses);
router
  .route(process.env.GET_ONE_STUDENT_ONE_COURSE_URL)
  .get(courseController.getOneCourse);

module.exports = router;
