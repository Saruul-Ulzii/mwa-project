const mongoose = require("mongoose");
const StudentSchema = mongoose.model(process.env.STUDENTS_MODEL_NAME);

const getCourses = function (req, res) {
  StudentSchema.findById(req.params.studentId).exec(function (err, student) {
    if (err) {
      console.error(err);
      return;
    }
    res.status(200).json(student.courses);
  });
};

const getOneCourse = function (req, res) {
  StudentSchema.findById(req.params.studentId).exec(function (err, student) {
    if (err) {
      console.error(err);
      return;
    }
    res.status(200).json(student.courses.id(req.params.courseId));
  });
};

module.exports = {
  getCourses,
  getOneCourse,
};
