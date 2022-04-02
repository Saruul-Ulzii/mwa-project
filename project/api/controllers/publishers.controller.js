const mongoose = require("mongoose");
const GameSchema = mongoose.model(process.env.GAME_MODEL_NAME);

const getOne = function (req, res) {
  if (req.params.gameId) {
    GameSchema.findById(req.params.gameId)
      .select("publisher")
      .exec(function (err, game) {
        if (err) {
          console.error(err);
          res.status(400).json({ Message: process.env.CONTACT_ADMIN_MESSAGE });
          return;
        }

        res.status(200).json(game.publisher);
      });
  } else {
    res.status(400).json({ Message: process.env.GAME_ID_REQUIRED_MESSAGE });
  }
};

module.exports = {
  getOne,
};
