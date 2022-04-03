const env = process.env;

const mongoose = require("mongoose");
const FishSchema = mongoose.model(process.env.FISH_MODEL);

const getAll = function (req, res) {
  const fishId = req.params.fishId;

  if (mongoose.isValidObjectId(fishId)) {
    FishSchema.findById(fishId)
      .select(env.FISH_DISTRIBUTION)
      .exec((err, fishes) => _getAll(err, fishes, res));
  } else {
    res.status(400).json({ Message: env.INVALID_FISHID_MESSAGE });
  }
};

const _getAll = function (err, fishes, res) {
  let response = {
    status: 200,
    message: {},
  };
  if (err) {
    response.status = 500;
    response.message = err;
  } else {
    response.status = 200;
    response.message = fishes.distribution;
  }

  res.status(response.status).json(response.message);
};

const getOne = function (req, res) {
  const fishId = req.params.fishId;
  const distId = req.params.distId;

  if (mongoose.isValidObjectId(fishId) && mongoose.isValidObjectId(distId)) {
    FishSchema.findById(fishId).exec((err, fish) =>
      _getOneDist(err, fish, res, distId)
    );
  } else {
    res.status(400).json({ Message: env.FISHID_AND_DIST_ID_REQUIRED_MESSAGE });
  }
};

const _getOneDist = function (err, fish, res, distId) {
  let response = {
    status: 200,
    message: {},
  };
  if (err) {
    response.status = 500;
    response.message = err;
  } else {
    response.status = 200;
    response.message = fish.distribution.id(distId);
  }

  res.status(response.status).json(response.message);
};

const addOne = function (req, res) {
  const fishId = req.params.fishId;
  if (mongoose.isValidObjectId(fishId)) {
    FishSchema.findById(fishId)
      .select(env.FISH_DISTRIBUTION)
      .exec((err, fish) => _addDistToFish(err, fish, req, res));
  } else {
    res.status(500).json({ Message: env.INVALID_FISHID_MESSAGE });
  }
};

const _addDistToFish = function (err, fish, req, res) {
  let response = {
    status: 200,
    message: {},
  };
  if (err) {
    response.status = 400;
    response.message = err;

    res.status(response.status).json(response.message);
  } else {
    if (fish) {
      let newDist = { name: req.body.name };
      fish.distribution.push(newDist);
      fish.save(function (err, updatedFish) {
        if (err) {
          response.status = 500;
          response.message = err;
        } else {
          response.status = 200;
          response.message = updatedFish;
        }

        res.status(response.status).json(response.message);
      });
    } else {
      response.status = 404;
      response.message = { Message: env.FISH_NOT_FOUND_MESSAGE };

      res.status(response.status).json(response.message);
    }
  }
};
const deleteOne = function (req, res) {
  const fishId = req.params.fishId;
  if (mongoose.isValidObjectId(fishId)) {
    FishSchema.findById(fishId).exec((err, fish) =>
      _deleteDist(err, fish, res)
    );
  } else {
    res.status(400).json({ Message: env.INVALID_FISHID_MESSAGE });
  }
};

const _deleteDist = function (err, fish, res) {
  if (err) {
    res.status(500).json(err);
  } else {
    res.status(200).json(fish);
  }
};

const update = function (req, res) {
  const fishId = req.params.fishId;
  const distId = req.params.distId;

  if (req.body.name == "") {
    res.status(400).json({ Message: env.DIST_NAME_REQUIRED_MESSAGE });
    return;
  }

  if (mongoose.isValidObjectId(fishId) && mongoose.isValidObjectId(distId)) {
    FishSchema.findById(fishId)
      .select(env.FISH_DISTRIBUTION)
      .exec((err, fish) => _updateDist(err, fish, distId, res));
  } else {
    res.status(400).json({ Message: env.FISHID_AND_DIST_ID_REQUIRED_MESSAGE });
  }
};

const _updateDist = function (err, fish, distId, res) {
  if (err) {
    res.status(500).json(err);
  } else {
    if (fish) {
      let dist = fish.distribution.id(distId);
      if (dist) {
        dist.name = req.body.name;
        dist.save(function (err, updatedDist) {
          if (err) {
            res.status(500).json(err);
          } else {
            res.status(200).json(updatedDist);
          }
        });
      } else {
        res.status(404).json({ Message: env.DIST_NOT_FOUND_MESSAGE });
      }
    } else {
      res.status(404).json({ Message: env.FISH_NOT_FOUND_MESSAGE });
    }
  }
};

module.exports = {
  getAll,
  getOne,
  addOne,
  deleteOne,
  update,
};
