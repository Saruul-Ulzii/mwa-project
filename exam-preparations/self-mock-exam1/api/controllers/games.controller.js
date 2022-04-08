const { ifError } = require("assert");
const mongoose = require("mongoose");
const GameSchema = mongoose.model("Game");

const getAll = function (req, res) {
  let offset = parseInt(process.env.OFFSET_VALUE);
  let count = parseInt(process.env.FETCH_VALUE);
  const maxCount = parseInt(process.env.MAX_COUNT);

  const response = {
    status: 200,
    message: {},
  };

  if (req.query && req.query.offset) {
    offset = parseInt(req.query.offset);
  }

  if (req.query && req.query.count) {
    count = parseInt(req.query.count);
  }

  if (isNaN(offset) || isNaN(count)) {
    response.status = 400;
    response.message = {
      Message: process.env.OFFSET_COUNT_MUST_DIGITS_MESSAGE,
    };
  }

  if (count > maxCount) {
    response.status = 400;
    response.message = {
      Message: `${process.env.COUNT_LESS_THAN_MESSAGE} ${process.env.MAX_COUNT}`,
    };
  }

  if (response.status != 200) {
    res.status(response.status).json(response.message);
  }

  GameSchema.find()
    .skip(offset)
    .limit(count)
    .exec((err, games) => _getAll(err, games, res));
};

const _getAll = function (err, games, res) {
  const response = {
    status: 200,
    message: {},
  };

  if (err) {
    response.status = 500;
    response.message = err;
  } else {
    response.status = 200;
    response.message = games;
  }

  res.status(response.status).json(response.message);
};
const getOne = function (req, res) {};
const addOne = function (req, res) {};
const deleteOne = function (req, res) {};
const updateOne = function (req, res) {};

module.exports = {
  getAll,
  getOne,
  addOne,
  deleteOne,
  updateOne,
};
