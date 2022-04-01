const dbConnection = require("../resources/data/dbconnection");
const ObjectId = require("mongodb").ObjectId;

const getCollection = function (collectionName) {
  const db = dbConnection.get();
  return db.collection(collectionName);
};

const getAll = function (req, res) {
  let offset = 0;
  let count = 3;

  if (req.query && req.query.offset) {
    offset = parseInt(req.query.offset);
  }

  if (req.query && req.query.count) {
    count = Math.min(
      parseInt(req.query.count),
      process.env.GAMES_FETCH_MAX_COUNT
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
  let gameId = req.params.gameId;

  const gamesCollection = getCollection(process.env.GAMES_COLLECTION_NAME);
  gamesCollection.findOne({ _id: ObjectId(gameId) }, function (err, game) {
    if (err) {
      res.status(400).json({ error: err });
    } else {
      res.status(200).json(game);
    }
  });
};

const addOne = function (req, res) {
  let newGame = {};

  console.log(req.body);
  if (req.body) {
    let minPlayers = parseInt(req.body.minPlayers);
    console.log(minPlayers);
    if (
      !minPlayers ||
      minPlayers < process.env.GAME_PLAYER_COUNT_MIN ||
      minPlayers > process.env.GAME_PLAYER_COUNT_MAX
    ) {
      res.status(200).json({
        Message: `${process.env.GAME_PLAYER_COUNT_MESSAGE} [${process.env.GAME_PLAYER_COUNT_MIN}-${process.env.GAME_PLAYER_COUNT_MAX}]`,
      });
      return;
    }
    newGame.minPlayers = minPlayers;
  }
  if (req.body && req.body.age) {
    let age = parseInt(req.body.age);
    console.log(age);
    if (
      age < process.env.GAME_PLAYER_AGE_MIN ||
      age > process.env.GAME_PLAYER_AGE_MAX
    ) {
      res.status(400).json({
        Message: `${process.env.GAME_PLAYER_AGE_MESSAGE} [${process.env.GAME_PLAYER_AGE_MIN}-${process.env.GAME_PLAYER_AGE_MAX}]`,
      });
      return;
    }
    newGame.age = age;
  }
  if (req.body && req.body.price) {
    let price = parseFloat(req.body.price);
    if (price < 0) {
      res.status(400).json({
        Message: process.env.GAME_PRICE_REQUIRED_MESSAGE,
      });
      return;
    }
    newGame.price = price;
  }
  if (req.body && req.body.title) {
    let title = parseFloat(req.body.title);
    if (title || title == "") {
      res.status(400).json({
        Message: process.env.GAME_TITLE_REQUIRED_MESSAGE,
      });
      return;
    }
    newGame.title = title;
  }
  if (newGame != {}) {
    const gamesCollection = getCollection(process.env.GAMES_COLLECTION_NAME);
    gamesCollection.insertOne(newGame, function (err, savedGame) {
      if (err) {
        res.status(500).json({ error: err });
      } else {
        res.status(201).json(savedGame);
      }
    });
  }
};

const deleteOne = function (req, res) {
  let gameId = req.params.gameId;

  const gamesCollection = getCollection(process.env.GAMES_COLLECTION_NAME);
  gamesCollection.deleteOne({ _id: ObjectId(gameId) }, function (err, game) {
    if (err) {
      res.status(400).json({ error: err });
    } else {
      res.status(200).json(game);
    }
  });
};

module.exports = {
  getAll,
  getOne,
  addOne,
  deleteOne,
};
