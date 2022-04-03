const env = process.env;

const mongoose = require("mongoose");
const FishSchema = mongoose.model(env.FISH_MODEL);

const getAll = function (req, res) {
  let count = parseInt(env.FETCH_COUNT_DEFAULT_VALUE);
  let offset = parseInt(env.FETCH_OFFSET_DEFAULT_VALUE);
  const maxCount = parseInt(env.FETCH_COUNT_MAX_VALUE);

  let response = {
    status: env.STATUS_CODE_200,
    message: {},
  };

  if (req.query && req.query.count) {
    count = parseInt(req.query.count);
  }
  if (req.query && req.query.offset) {
    offset = parseInt(req.query.offset);
  }

  if (isNaN(count) || isNaN(offset)) {
    response.status = env.STATUS_CODE_400;
    response.message = { Message: env.OFFSET_AND_COUNT_DIGITS_MESSAGE };
  }

  if (count > maxCount) {
    response.status = env.STATUS_CODE_400;
    response.message = {
      Message: `${env.COUNT_LESS_MESSAGE} ${env.FETCH_COUNT_MAX_VALUE}`,
    };
  }

  if (response.status !== env.STATUS_CODE_200) {
    res.status(response.status).json(response.message);
    return;
  }

  FishSchema.find()
    .skip(offset)
    .limit(count)
    .exec((err, fishes) => _getAll(err, fishes, response, res));
};

const _getAll = function (err, fishes, response, res) {
  if (err) {
    response.status = env.STATUS_CODE_500;
    response.message = err;
  } else {
    response.status = env.STATUS_CODE_200;
    response.message = fishes;
  }

  res.status(response.status).json(response.message);
};

const getOne = function (req, res) {
  const fishId = req.params.fishId;
  if (mongoose.isValidObjectId(fishId)) {
    FishSchema.findById(fishId).exec((err, fish) => _getFish(err, fish, res));
  } else {
    res
      .status(env.STATUS_CODE_400)
      .json({ Message: env.INVALID_FISHID_MESSAGE });
  }
};

const _getFish = function (err, fish, res) {
  let response = {
    status: env.STATUS_CODE_200,
    message: {},
  };
  if (err) {
    response.status = env.STATUS_CODE_500;
    response.message = err;
  } else {
    if (fish) {
      response.status = env.STATUS_CODE_200;
      response.message = fish;
    } else {
      response.status = env.STATUS_CODE_404;
      response.message = { Message: env.FISH_NOT_FOUND_MESSAGE };
    }
  }

  res.status(response.status).json(response.message);
};

const addOne = function (req, res) {
  if (req.body && req.body.name) {
    let Fish = {
      name: req.body.name,
      family: req.body.family || "",
      food: req.body.food || "",
      distribution: req.body.dists,
    };
    FishSchema.create(Fish, (err, createdFish) =>
      _addFish(err, createdFish, res)
    );
  } else {
    res
      .status(env.STATUS_CODE_400)
      .json({ Message: env.NAME_REQUIRED_MESSAGE });
  }
};

const _addFish = function (err, createdFish, res) {
  let response = {
    status: env.STATUS_CODE_200,
    message: {},
  };
  if (err) {
    response.status = env.STATUS_CODE_500;
    response.message = err;
  } else {
    response.status = env.STATUS_CODE_200;
    response.message = createdFish;
  }

  res.status(response.status).json(response.message);
};

const deleteOne = function (req, res) {
  const fishId = req.params.fishId;
  if (mongoose.isValidObjectId(fishId)) {
    FishSchema.deleteOne({ _id: req.params.fishId }).exec((err, fish) =>
      _deleteFish(err, fish, res)
    );
  } else {
    res
      .status(env.STATUS_CODE_400)
      .json({ Message: env.INVALID_FISHID_MESSAGE });
  }
};

const _deleteFish = function (err, deletedFish, res) {
  let response = {
    status: env.STATUS_CODE_200,
    message: {},
  };
  if (err) {
    res.status = env.STATUS_CODE_500;
    res.message = err;
  } else {
    res.status = env.STATUS_CODE_200;
    res.message = deletedFish;
  }

  res.status(response.status).json(response.message);
};

const update = function (req, res) {
  const fishId = req.params.fishId;

  if (req.body.name == "") {
    res
      .status(env.STATUS_CODE_200)
      .json({ Message: env.NAME_REQUIRED_MESSAGE });
    return;
  }

  if (mongoose.isValidObjectId(fishId)) {
    FishSchema.findById(fishId).exec(function (err, fish) {
      let response = {
        status: env.STATUS_CODE_200,
        message: {},
      };
      if (err) {
        response.status = env.STATUS_CODE_500;
        response.message = err;

        res.status(response.status).json(response.message);
      } else {
        if (fish) {
          _updateFish(req, res, fish);
        } else {
          response.status = env.STATUS_CODE_404;
          response.message = { Message: env.FISH_NOT_FOUND_MESSAGE };

          res.status(response.status).json(response.message);
        }
      }
    });
  } else {
    res
      .status(env.STATUS_CODE_400)
      .json({ Message: env.INVALID_FISHID_MESSAGE });
  }
};

function _updateFish(req, res, fish) {
  if (req.body.name) {
    fish.name = req.body.name;
  }
  if (req.body.family) {
    fish.family = req.body.family;
  }
  if (req.body.food) {
    fish.food = req.body.food;
  }

  fish.save(function (err, updatedFish) {
    let response = {
      status: env.STATUS_CODE_200,
      message: {},
    };
    if (err) {
      response.status = env.STATUS_CODE_500;
      response.message = err;
    } else {
      response.status = env.STATUS_CODE_200;
      response.message = updatedFish;
    }

    res.status(response.status).json(response.message);
  });
}

module.exports = {
  getAll,
  getOne,
  addOne,
  deleteOne,
  update,
};
