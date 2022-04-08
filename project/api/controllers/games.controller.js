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
    .sort({ _id: -1 })
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
    let newGame = {
      title: req.body.title,
      price: req.body.price,
      year: req.body.year,
      rate: req.body.rate,
      minPlayers: req.body.minPlayers,
      maxPlayers: req.body.maxPlayers,
      minAge: req.body.minAge,
      publisher: { name: process.env.GAMES_PUBLISHER_DUMMY_NAME },
    };

    console.log(newGame);
    GameSchema.create(newGame, function (err, savedGame) {
      if (err) {
        console.log(err);
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

const updateOne = function (req, res) {
  const gameId = req.params.gameId;

  if (mongoose.isValidObjectId(gameId)) {
    GameSchema.findById(gameId).exec((err, game) =>
      _updateGame(err, game, req, res)
    );
  } else {
    res.status(400).json({ Message: process.env.GAME_ID_REQUIRED_MESSAGE });
  }
};

_updateGame = function (err, game, req, res) {
  const response = {
    status: 200,
    message: {},
  };
  if (err) {
    response.status = 500;
    response.message = err;

    res.status(response.status).json(response.message);
  } else {
    if (game) {
      const isFullUpdate = req.method == process.env.PUT_METHOD;
      game.title = isFullUpdate ? req.body.title : req.body.title || game.title;
      game.year = isFullUpdate ? req.body.year : req.body.year || game.year;
      game.price = isFullUpdate ? req.body.price : req.body.price || game.price;
      game.minPlayers = isFullUpdate
        ? req.body.minPlayers
        : req.body.minPlayers || game.minPlayers;
      game.maxPlayers = isFullUpdate
        ? req.body.maxPlayers
        : req.body.maxPlayers || game.maxPlayers;
      game.minAge = isFullUpdate
        ? req.body.minAge
        : req.body.minAge || game.minAge;

      game.save(function (err, savedGame) {
        if (err) {
          response.status = 500;
          response.message = err;
        } else {
          response.status = 200;
          response.message = savedGame;
        }

        res.status(response.status).json(response.message);
      });
    } else {
      response.status = 404;
      response.message = { Message: process.env.GAME_NOT_FOUND_MESSAGE };

      res.status(response.status).json(response.message);
    }
  }
};

module.exports = {
  getAll,
  getOne,
  addOne,
  deleteOne,
  updateOne,
};
