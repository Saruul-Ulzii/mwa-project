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

  if (req.query && req.query.search) {
    _getAllWithCondition(req, res, offset, count, response);
    return;
  } else {
    FishSchema.find()
      .skip(offset)
      .limit(count)
      .then((fishes) => {
        _onSuccessResult(fishes, response);
      })
      .catch((err) => {
        _handleError(err, response);
      })
      .finally(() => {
        _sendResponse(res, response);
      });
  }
};

const _getAllWithCondition = function (req, res, offset, count, response) {
  const search = req.query.search;
  const query = {
    $or: [
      {
        name: { $regex: search, $options: env.QUERY_OPTIONS },
      },
    ],
  };
  FishSchema.find(query)
    .skip(offset)
    .limit(count)
    .then((fishes) => {
      _onSuccessResult(fishes, response);
    })
    .catch((err) => {
      _handleError(err, response);
    })
    .finally(() => {
      _sendResponse(res, response);
    });
};

_onSuccessResult = function (result, response) {
  response.status = process.env.STATUS_CODE_200;
  response.message = result;
};

_sendResponse = function (res, response) {
  res.status(response.status).json(response.message);
};

_handleError = function (err, response) {
  response.status = process.env.STATUS_CODE_500;
  response.message = err;
};

const getOne = function (req, res) {
  const fishId = req.params.fishId;
  let response = {
    status: env.STATUS_CODE_200,
    message: {},
  };

  if (mongoose.isValidObjectId(fishId)) {
    FishSchema.findById(fishId)
      .then((fish) => {
        _onSuccessResult(fish, response);
      })
      .catch((err) => {
        _handleError(err, response);
      })
      .finally(() => {
        _sendResponse(res, response);
      });
  } else {
    response.status = env.STATUS_CODE_400;
    response.message = { Message: env.INVALID_FISHID_MESSAGE };

    this._sendResponse(res, response);
  }
};

const addOne = function (req, res) {
  let response = {
    status: env.STATUS_CODE_200,
    message: {},
  };

  if (req.body && req.body.name) {
    let Fish = {
      name: req.body.name,
      family: req.body.family || "",
      food: req.body.food || "",
      distribution: req.body.distribution,
    };
    FishSchema.create(Fish)
      .then((createdFish) => {
        _onSuccessResult(createdFish, response);
      })
      .catch((err) => {
        _handleError(err, response);
      })
      .finally(() => {
        _sendResponse(res, response);
      });
  } else {
    response.status = env.STATUS_CODE_400;
    response.message = { Message: env.NAME_REQUIRED_MESSAGE };

    this._sendResponse(res, response);
  }
};

const deleteOne = function (req, res) {
  const fishId = req.params.fishId;
  let response = {
    status: env.STATUS_CODE_200,
    message: {},
  };
  if (mongoose.isValidObjectId(fishId)) {
    FishSchema.deleteOne({ _id: req.params.fishId })
      .then((result) => {
        _onSuccessResult(result, response);
      })
      .catch((err) => {
        _handleError(err, response);
      })
      .finally(() => {
        _sendResponse(res, response);
      });
  } else {
    response.status = env.STATUS_CODE_400;
    response.message = { Message: env.INVALID_FISHID_MESSAGE };

    this._sendResponse(res, response);
  }
};

const update = function (req, res) {
  const fishId = req.params.fishId;
  let response = {
    status: env.STATUS_CODE_200,
    message: {},
  };

  if (req.body.name == "") {
    res
      .status(env.STATUS_CODE_200)
      .json({ Message: env.NAME_REQUIRED_MESSAGE });
    return;
  }

  if (mongoose.isValidObjectId(fishId)) {
    FishSchema.findById(fishId)
      .then((fish) => {
        if (fish) {
          _updateFish(req, res, fish, response);
        } else {
          response.status = env.STATUS_CODE_404;
          response.message = { Message: env.FISH_NOT_FOUND_MESSAGE };

          _sendResponse(res, response);
        }
      })
      .catch((err) => {
        _handleError(err, response);
        _sendResponse(res, response);
      });
  } else {
    res
      .status(env.STATUS_CODE_400)
      .json({ Message: env.INVALID_FISHID_MESSAGE });
  }
};

function _updateFish(req, res, fish, response) {
  const isFullUpdate = req.method == env.METHOD_PUT;

  fish.name = isFullUpdate ? req.body.name : req.body.name || fish.name;
  fish.family = isFullUpdate ? req.body.family : req.body.family || fish.family;
  fish.food = isFullUpdate ? req.body.food : req.body.food || fish.food;
  fish.distribution = isFullUpdate
    ? req.body.distribution
    : req.body.distribution || fish.distribution;

  fish
    .save()
    .then((updatedFish) => {
      _onSuccessResult(updatedFish, response);
    })
    .catch((err) => {
      _handleError(err, response);
    })
    .finally(() => {
      _sendResponse(res, response);
    });
}

module.exports = {
  getAll,
  getOne,
  addOne,
  deleteOne,
  update,
};
