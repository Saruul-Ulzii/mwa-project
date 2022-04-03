const mongoose = require("mongoose");

const DistributionSchema = mongoose.Schema({
  name: String,
  location: {},
});

const FishSchema = mongoose.Schema({
  name: { type: String, required: true },
  family: String,
  food: String,
  distribution: [DistributionSchema],
});

mongoose.model(process.env.FISH_MODEL, FishSchema, process.env.FISH_COLLECTION);
