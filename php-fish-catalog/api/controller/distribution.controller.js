const env = process.env;

const { response } = require("express");
const mongoose = require("mongoose");
const FishSchema = mongoose.model(process.env.FISH_MODEL);

const getAll = function (req, res) {
  const fishId = req.params.fishId;
  const response = {
    status: env.STATUS_CODE_200,
    message: {},
  };

  if (mongoose.isValidObjectId(fishId)) {
    FishSchema.findById(fishId)
      .select(env.FISH_DISTRIBUTION)
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
  const distId = req.params.distId;

  const response = {
    status: env.STATUS_CODE_200,
    message: {},
  };

  if (mongoose.isValidObjectId(fishId) && mongoose.isValidObjectId(distId)) {
    FishSchema.findById(fishId)
      .then((fish) => {
        _onSuccessDist(fish, distId, response);
      })
      .catch((err) => {
        _handleError(err, response);
      })
      .finally(() => {
        _sendResponse(res, response);
      });
  } else {
    response.status = env.STATUS_CODE_400;
    response.message = { Message: env.FISHID_AND_DIST_ID_REQUIRED_MESSAGE };

    this._sendResponse(res, response);
  }
};

_onSuccessDist = function (fish, distId, response) {
  response.status = process.env.STATUS_CODE_200;
  response.message = fish.distribution.id(distId);
};

const addOne = function (req, res) {
  const fishId = req.params.fishId;
  const response = {
    status: env.STATUS_CODE_200,
    message: {},
  };

  if (!req.body.name) {
    response.status = env.STATUS_CODE_400;
    response.message = { Message: env.DIST_NAME_REQUIRED_MESSAGE };

    this._sendResponse(res, response);
    return;
  }

  let newDist = { d_name: req.body.name };

  if (mongoose.isValidObjectId(fishId)) {
    FishSchema.findById(fishId)
      .select(env.FISH_DISTRIBUTION)
      .then((fish) => {
        _addDistToFish(fish, newDist, res, response);
      })
      .catch((err) => {
        _handleError(err, response);
        _sendResponse(res, response);
      });
  } else {
    response.status = env.STATUS_CODE_500;
    response.message = { Message: env.INVALID_FISHID_MESSAGE };

    this._sendResponse(res, response);
  }
};

const _addDistToFish = function (fish, newDist, res, response) {
  if (fish) {
    fish.distribution.push(newDist);
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
  } else {
    response.status = env.STATUS_CODE_404;
    response.message = { Message: env.FISH_NOT_FOUND_MESSAGE };

    this._sendResponse(res, response);
  }
};

const deleteOne = function (req, res) {
  const fishId = req.params.fishId;
  const distId = req.params.distId;
  const response = {
    status: env.STATUS_CODE_200,
    message: {},
  };

  if (mongoose.isValidObjectId(fishId) && mongoose.isValidObjectId(distId)) {
    FishSchema.findById(fishId)
      .then((fish) => {
        _deleteDist(fish, distId, res, response);
      })
      .catch((err) => {
        _handleError(err, response);
        _sendResponse(res, response);
      });
  } else {
    response.status = env.STATUS_CODE_400;
    response.message = { Message: env.INVALID_FISH_AND_DISTID_MESSAGE };

    this._sendResponse(res, response);
  }
};

const _deleteDist = function (fish, distId, res, response) {
  if (fish) {
    if (fish.distribution.id(distId)) {
      fish.distribution.id(distId).remove();
      fish
        .save()
        .then((savedFish) => {
          _onSuccessResult(savedFish, response);
        })
        .catch((err) => {
          _handleError(err, response);
        })
        .finally(() => {
          _sendResponse(res, response);
        });
    } else {
      response.status = env.STATUS_CODE_404;
      response.message = { Message: env.DIST_NOT_FOUND_MESSAGE };

      this._sendResponse(res, response);
    }
  } else {
    response.status = env.STATUS_CODE_404;
    response.message = { Message: env.FISH_NOT_FOUND_MESSAGE };

    this._sendResponse(res, response);
  }
};

const update = function (req, res) {
  const fishId = req.params.fishId;
  const distId = req.params.distId;
  const response = {
    status: env.STATUS_CODE_200,
    message: {},
  };

  if (req.body.name == "") {
    res
      .status(env.STATUS_CODE_400)
      .json({ Message: env.DIST_NAME_REQUIRED_MESSAGE });
    return;
  }

  if (mongoose.isValidObjectId(fishId) && mongoose.isValidObjectId(distId)) {
    FishSchema.findById(fishId)
      .select(env.FISH_DISTRIBUTION)
      .then((fish) => {
        _updateDist(fish, distId, req, res, response);
      })
      .catch((err) => {
        _handleError(err, response);
        _sendResponse(res, response);
      });
  } else {
    response.status = env.STATUS_CODE_400;
    response.message = { Message: env.FISHID_AND_DIST_ID_REQUIRED_MESSAGE };

    this._sendResponse(res, response);
  }
};

const _updateDist = function (fish, distId, req, res, response) {
  if (fish) {
    let dist = fish.distribution.id(distId);
    if (dist) {
      dist.d_name = req.body.name;
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
    } else {
      response.status = env.STATUS_CODE_404;
      response.message = { Message: env.DIST_NOT_FOUND_MESSAGE };

      this._sendResponse(res, response);
    }
  } else {
    response.status = env.STATUS_CODE_404;
    response.message = { Message: env.FISH_NOT_FOUND_MESSAGE };

    this._sendResponse(res, response);
  }
};

module.exports = {
  getAll,
  getOne,
  addOne,
  deleteOne,
  update,
};
