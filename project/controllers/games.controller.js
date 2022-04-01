const dbConnection = require("../resources/data/dbconnection");
const ObjectId = require("mongodb").ObjectId;

const getCollection = function (collectionName) {
  const db = dbConnection.get();
  return db.collection(collectionName);
};

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

  const gamesCollection = getCollection(process.env.GAMES_COLLECTION_NAME);
  gamesCollection
    .find()
    .skip(offset)
    .limit(count)
    .toArray(function (err, games) {
      if (err) {
        res.status(400).json({ error: err });
      } else {
        res.status(200).json(games);
      }
    });
};

const getOne = function (req, res) {
  if (req.params.gameId) {
    const gamesCollection = getCollection(process.env.GAMES_COLLECTION_NAME);
    gamesCollection.findOne(
      { _id: ObjectId(req.params.gameId) },
      function (err, game) {
        if (err) {
          res.status(400).json({ error: err });
        } else {
          res.status(200).json(game);
        }
      }
    );
  } else {
    res.status(400).json({ Message: process.env.GAME_ID_REQUIRED_MESSAGE });
  }
};

const addOne = function (req, res) {
  let newGame = {};

  if (req.body) {
    let minPlayers = parseInt(req.body.minPlayers);
    if (
      !minPlayers ||
      minPlayers < process.env.GAME_PLAYER_COUNT_MIN ||
      minPlayers > process.env.GAME_PLAYER_COUNT_MAX
    ) {
      res.status(400).json({
        Message: `${process.env.GAME_PLAYER_COUNT_MESSAGE} [${process.env.GAME_PLAYER_COUNT_MIN}-${process.env.GAME_PLAYER_COUNT_MAX}]`,
      });
      return;
    }
    newGame.minPlayers = minPlayers;

    let age = parseInt(req.body.age);
    if (
      !age ||
      age < process.env.GAME_PLAYER_AGE_MIN ||
      age > process.env.GAME_PLAYER_AGE_MAX
    ) {
      res.status(400).json({
        Message: `${process.env.GAME_PLAYER_AGE_MESSAGE} [${process.env.GAME_PLAYER_AGE_MIN}-${process.env.GAME_PLAYER_AGE_MAX}]`,
      });
      return;
    }
    newGame.age = age;

    let price = parseFloat(req.body.price);
    if (!price || price < 0) {
      res.status(400).json({
        Message: process.env.GAME_PRICE_REQUIRED_MESSAGE,
      });
      return;
    }
    newGame.price = price;

    let title = req.body.title;
    if (!title) {
      res.status(400).json({
        Message: process.env.GAME_TITLE_REQUIRED_MESSAGE,
      });
      return;
    }
    newGame.title = title;

    if (newGame != {}) {
      const gamesCollection = getCollection(process.env.GAMES_COLLECTION_NAME);
      gamesCollection.insertOne(newGame, function (err, savedGame) {
        if (err) {
          res.status(500).json({ error: err });
        } else {
          res.status(201).json(savedGame);
        }
      });
    } else {
      res.status(500).json({ Message: process.env.GAME_OBJECT_EMPTY_MESSAGE });
    }
  } else {
    res.status(500).json({ Message: process.env.REQUEST_BODY_EMPTY_MESSAGE });
  }
};

const deleteOne = function (req, res) {
  if (req.params.gameId) {
    const gamesCollection = getCollection(process.env.GAMES_COLLECTION_NAME);
    gamesCollection.deleteOne(
      { _id: ObjectId(req.params.gameId) },
      function (err, game) {
        if (err) {
          res.status(400).json({ error: err });
        } else {
          res.status(200).json(game);
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
