const createConfig = require("../db/createConfig");

const movieGenres = require("../movies-app/json/movieGenreMap.json");
const tvGenres = require("../movies-app/json/tvGenreMap.json");

const genreMappingConfig = async () => {
  try {
    const database = "movies_database";
    const collection = "configs";

    const toIdNameMap = (list) =>
      list.reduce((acc, curr) => {
        acc[curr.id] = curr.name;
        return acc;
      }, {});

    const configObj = {
      name: "GENRE_MAPPING_CONFIG_demo",
      description: "This config has genre-ids mapped to genre-names",
      configs: {
        movie: toIdNameMap(movieGenres),
        tv_show: toIdNameMap(tvGenres),
      },
      created_by: "bikashrajkhowa",
      created_at: new Date(),
      updated_at: new Date(),
    };

    await createConfig(database, collection, configObj);
  } catch (error) {
    console.error("Error inserting genre config:", error);
    throw error;
  }
};

module.exports = genreMappingConfig;
