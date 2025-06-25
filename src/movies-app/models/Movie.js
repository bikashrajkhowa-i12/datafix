const mongoose = require("mongoose");
const _ = require("lodash");

const rawSchema = {
  id: { type: Number },
  genreIds: [{ type: Number }],
  title: { type: String },
  name: { type: String },
  type: { type: String, enum: ["movie", "tv_show"], required: true },
  rating: { type: Number },
  releaseDate: { type: Date },
  popularity: { type: Number },
  voteAverage: { type: Number, min: 0, max: 10 },
  voteCount: { type: Number },
  overView: { type: String },
  posterPath: { type: String },
  originalLanguage: { type: String },
  originCountry: [{ type: String }],
  firstAirDate: { type: Date },
  timeStamp: { type: Date, default: Date.now }
};

// Convert keys to snake_case 
const snakeCaseSchema = {};
Object.entries(rawSchema).forEach(([key, value]) => {
  snakeCaseSchema[_.snakeCase(key)] = value;
});

// Build the schema
const movieSchema = new mongoose.Schema(snakeCaseSchema, {
  collection: "movies"
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
