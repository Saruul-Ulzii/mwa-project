const mongoose = require("mongoose");

const GameSchema = mongoose.Schema({
  title: { type: String, required: true },
  year: Number,
});

mongoose.model(
  process.env.DB_GAME_MODEL,
  GameSchema,
  process.env.DB_GAME_COLLECTION
);
