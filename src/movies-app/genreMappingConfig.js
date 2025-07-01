const createConfig = require("../db/createConfig");

const movieGenres = require("../movies-app/json/movieGenreMap.json");
const tvGenres = require("../movies-app/json/tvGenreMap.json");

const genreMappingConfig = async () => {
  try {
    const database = "movies_database";
    const collection = "configs";
    const configObj = {
      name: "GENRE_MAPPING_CONFIG",
      description: "This config has genre-ids mapped to genre-names",
      configs: {
        movie: movieGenres,
        tv_show: tvGenres,
      },
      created_at: new Date(),
      updated_at: new Date(),
    };
    await createConfig(database, collection, configObj);
  } catch (error) {
    throw error;
  }
};

module.exports = genreMappingConfig;