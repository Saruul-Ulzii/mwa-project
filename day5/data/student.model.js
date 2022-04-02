const mongoose = require("mongoose");

const CourseSchema = mongoose.Schema({
  name: String,
  block: String,
});

const StudentSchema = mongoose.Schema({
  name: String,
  gpa: Number,
  courses: [CourseSchema],
});

mongoose.model(
  process.env.STUDENTS_MODEL_NAME,
  StudentSchema,
  process.env.STUDENTS_COLLECTION_NAME
);
