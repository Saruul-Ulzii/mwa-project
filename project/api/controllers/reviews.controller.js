const mongoose = require("mongoose");
const GameSchema = mongoose.model(process.env.GAME_MODEL_NAME);

const getAll = function (req, res) {
  GameSchema.findById(req.params.gameId).exec(function (err, game) {
    if (err) {
      console.error(err);
      res.status(400).json({ Message: process.env.CONTACT_ADMIN_MESSAGE });
      return;
    }

    res.status(200).json(game.reviews);
  });
};

const getOne = function (req, res) {
  GameSchema.findById(req.params.gameId).exec(function (err, game) {
    if (err) {
      console.error(err);
      res.status(400).json({ Message: process.env.CONTACT_ADMIN_MESSAGE });
      return;
    }

    res.status(200).json(game.reviews.id(req.params.reviewId));
  });
};

module.exports = {
  getAll,
  getOne,
};
