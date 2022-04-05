const mongoose = require("mongoose");
const GameSchema = mongoose.model(process.env.GAME_MODEL_NAME);

const getAll = function (req, res) {
  GameSchema.findById(req.params.gameId)
    .select(process.env.GAMES_REVIEWS)
    .exec(function (err, game) {
      if (err) {
        console.error(err);
        res.status(400).json({ Message: process.env.CONTACT_ADMIN_MESSAGE });
        return;
      }

      res.status(200).json(game.reviews);
    });
};

const getOne = function (req, res) {
  GameSchema.findById(req.params.gameId)
    .select(process.env.GAMES_REVIEWS)
    .exec(function (err, game) {
      if (err) {
        console.error(err);
        res.status(400).json({ Message: process.env.CONTACT_ADMIN_MESSAGE });
        return;
      }

      res.status(200).json(game.reviews.id(req.params.reviewId));
    });
};

const updateOne = function (req, res) {
  const gameId = req.params.gameId;
  const reviewId = req.params.reviewId;
  const response = {
    status: 200,
    message: {},
  };

  if (!mongoose.isValidObjectId(reviewId)) {
    response.status = 400;
    response.message = { Message: process.env.GAME_REVIEW_ID_REQUIRED_MESSAGE };
    res.status(response.status).json(response.message);
    return;
  }

  if (mongoose.isValidObjectId(gameId)) {
    GameSchema.findById(gameId)
      .select(process.env.GAMES_REVIEWS)
      .exec((err, game) => _updateOne(err, game, req, res));
  } else {
    response.status = 400;
    response.message = { Message: process.env.GAME_ID_REQUIRED_MESSAGE };
  }
};

_updateOne = function (err, game, req, res) {
  const response = {
    status: 200,
    message: {},
  };

  if (err) {
    response.status = 500;
    response.message = err;
    res.status(respon.status).json(response.message);
  } else {
    if (game) {
      let review = game.reviews.id(req.params.reviewId);
      console.log(review);
      console.log(req.body);
      if (review) {
        const isFullUpdate = req.method == process.env.PUT_METHOD;
        review.title = isFullUpdate
          ? req.body.title
          : req.body.title || review.title;
        review.rating = isFullUpdate
          ? req.body.rating
          : req.body.rating || review.rating;
        review.review = isFullUpdate
          ? req.body.review
          : req.body.review || review.review;
        review.postDate = isFullUpdate
          ? req.body.postDate
          : req.body.postDate || review.postDate;
        console.log(
          isFullUpdate ? req.body.rating : req.body.rating || review.rating
        );

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
          Message: process.env.GAME_REVIEW_NOT_FOUND_MESSAGE,
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
  getAll,
  getOne,
  updateOne,
};
