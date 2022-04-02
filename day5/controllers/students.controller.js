const mongoose = require("mongoose");
const StudentSchema = mongoose.model(process.env.STUDENTS_MODEL_NAME);

const getStudents = function (req, res) {
  StudentSchema.find().exec(function (err, students) {
    if (err) {
      console.error(err);
      return;
    }
    res.status(200).json(students);
  });
};

const getStudentById = function (req, res) {
  let rowIndex = req.params.studentId;
  StudentSchema.findById(req.params.studentId).exec(function (err, student) {
    if (err) {
      console.error(err);
      return;
    }
    res.status(200).json(student);
  });
};

const addOne = function (req, res) {
  if (req.body) {
    let newStudent = {};
    newStudent.name = req.body.name;
    newStudent.gpa = req.body.gpa;
    newStudent.courses = [];
    newStudent.courses.name = req.body.courseName;
    newStudent.courses.block = req.body.courseBlock;

    StudentSchema.create(newStudent, function (err, savedGame) {
      if (err) {
        res.status(500).json({ error: err });
      } else {
        res.status(201).json(savedGame);
      }
    });
  }
};

module.exports = {
  addOne,
  getStudents,
  getStudentById,
};
