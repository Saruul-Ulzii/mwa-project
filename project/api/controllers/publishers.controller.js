const req = require("express/lib/request");
const mongoose = require("mongoose");
const GameSchema = mongoose.model(process.env.GAME_MODEL_NAME);

const getOne = function (req, res) {
  const response = {
    status: 200,
    message: {},
  };
  if (req.params.gameId) {
    GameSchema.findById(req.params.gameId)
      .select(process.env.GAMES_PUBLISHER)
      .exec(function (err, game) {
        if (err) {
          res.status = 500;
          response.message = err;
        } else {
          res.status = 200;
          res.message = game;
        }
        res.status(response.status).json(response.message);
      });
  } else {
    response.status = 400;
    response.message = { Message: process.env.GAME_ID_REQUIRED_MESSAGE };
    res.status(response.status).json(response.message);
  }
};

const updateOne = function (req, res) {
  const gameId = req.params.gameId;

  if (mongoose.isValidObjectId(gameId)) {
    GameSchema.findById(gameId)
      .select(process.env.GAMES_PUBLISHER)
      .exec((err, game) => _updateOne(err, game, req, res));
  } else {
    req.status(400).json({ Message: process.env.GAME_ID_REQUIRED_MESSAGE });
  }
};

const _updateOne = function (err, game, req, res) {
  const response = {
    status: 204,
    message: {},
  };

  if (err) {
    response.status = 500;
    response.message = err;

    res.status(response.status).json(response.message);
  } else {
    if (game) {
      let publisher = game.publisher;
      if (publisher) {
        const isFullUpdate = req.method == process.env.PUT_METHOD;

        publisher.name = isFullUpdate
          ? req.body.name
          : req.body.name || publisher.name;
        publisher.country = isFullUpdate
          ? req.body.country
          : req.body.country || publisher.country;
        publisher.established = isFullUpdate
          ? req.body.established
          : req.body.established || publisher.established;
        publisher.location = isFullUpdate
          ? req.body.location
          : req.body.location || publisher.location;

        game.save(function (err, updatedGame) {
          if (err) {
            response.status = 500;
            response.message = err;
          } else {
            response.status = 200;
            response.message = updatedGame;
          }

          res.status(response.status).json(response.message);
        });
      } else {
        response.status = 404;
        response.message = {
          Message: process.env.GAME_HAVENT_PUBLISHER_MESSAGE,
        };

        res.status(response.status).json(response.message);
      }
    } else {
      response.status = 404;
      response.message = { Message: process.env.GAME_NOT_FOUND_MESSAGE };

      res.status(response.status).json(response.message);
    }
  }
};

module.exports = {
  getOne,
  updateOne,
};
