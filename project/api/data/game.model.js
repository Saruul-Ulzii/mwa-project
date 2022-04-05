const mongoose = require("mongoose");

const PublisherSchema = mongoose.Schema({
  name: { type: String, required: true },
  country: String,
  established: Number,
});

const ReviewSchema = mongoose.Schema({
  title: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5 },
  review: String,
  postDate: Date,
});

const GameSchema = mongoose.Schema({
  title: { type: String, required: true },
  year: Number,
  rate: { type: Number, min: 1, max: 5, default: 1 },
  price: { type: Number, default: 0.0 },
  minPlayers: { type: Number, min: 1, max: 10 },
  maxPlayers: { type: Number, min: 1, max: 10 },
  minAge: Number,
  publisher: PublisherSchema,
  designers: [String],
  reviews: [ReviewSchema],
});

mongoose.model(
  process.env.GAME_MODEL_NAME,
  GameSchema,
  process.env.GAMES_COLLECTION_NAME
);
