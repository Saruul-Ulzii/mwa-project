const mongoose = require("mongoose");
const GameSchema = mongoose.model(process.env.GAME_MODEL_NAME);

const getAll = function (req, res) {
  let offset = 0;
  let count = parseInt(process.env.GAMES_PAGINATION_LIMIT_DEFAULT_VALUE);

  if (req.query && req.query.offset) {
    offset = parseInt(req.query.offset);
  }

  if (req.query && req.query.count) {
    count = Math.min(
      parseInt(req.query.count),
      process.env.GAMES_PAGINATION_COUNT_MAX_VALUE
    );
  }

  GameSchema.find()
    .skip(offset)
    .limit(count)
    .exec(function (err, games) {
      if (err) {
        console.error(err);
        res.status(400).json({ Message: process.env.CONTACT_ADMIN_MESSAGE });
        return;
      }

      res.status(200).json(games);
    });
};

const getOne = function (req, res) {
  if (req.params.gameId) {
    GameSchema.findById(req.params.gameId).exec(function (err, game) {
      if (err) {
        console.error(err);
        res.status(400).json({ Message: process.env.CONTACT_ADMIN_MESSAGE });
        return;
      }

      res.status(200).json(game);
    });
  } else {
    res.status(400).json({ Message: process.env.GAME_ID_REQUIRED_MESSAGE });
  }
};

const addOne = function (req, res) {
  if (req.body) {
    let newGame = {};
    newGame.title = req.body.title;
    newGame.price = req.body.price;
    newGame.minPlayers = req.body.minPlayers;
    newGame.age = req.body.age;

    GameSchema.create(newGame, function (err, savedGame) {
      if (err) {
        res.status(500).json({ error: err });
      } else {
        res.status(201).json(savedGame);
      }
    });
  } else {
    res.status(500).json({ Message: process.env.REQUEST_BODY_EMPTY_MESSAGE });
  }
};

const deleteOne = function (req, res) {
  if (req.params.gameId) {
    GameSchema.deleteOne(
      { _id: req.params.gameId },
      function (err, deletedGame) {
        if (err) {
          res.status(400).json({ error: err });
        } else {
          res.status(200).json(deletedGame);
        }
      }
    );
  } else {
    res.status(400).json({ Message: process.env.GAME_ID_REQUIRED_MESSAGE });
  }
};

module.exports = {
  getAll,
  getOne,
  addOne,
  deleteOne,
};
