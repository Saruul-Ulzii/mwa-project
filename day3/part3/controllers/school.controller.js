const studentsData = require("../data/school.json");

module.exports.getStudents = function (req, res) {
  res.status(200).json(studentsData);
};

module.exports.getStudentById = function (req, res) {
  let rowIndex = req.params.studentRowIndex;
  if (rowIndex < 0 || studentsData.length < rowIndex) {
    res.status(404).json({
      NotFound: `Please choose :studentRowIndex param in [0-${studentsData.length}]`,
    });
  } else {
    res.status(200).json(studentsData[req.params.studentRowIndex - 1]);
  }
};
