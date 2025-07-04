const path = require("path");

const { mongo } = require("@bikashrajkhowa-i12/blackboxcore");

const { mongoBulkInsert } = require("../db/helper");
const generateCsv = require("../utils/generateCsv");

const movies = require("./json/movies.json");
const tvShows = require("./json/tvShows.json");

const insertMedia = async () => {
  const updatedRecords = [];
  
  // Append movie data with type
  if (Array.isArray(movies) && movies.length > 0) {
    movies.forEach((e) => {
      updatedRecords.push({ ...e, type: "movie" });
    });
  }

  // Append TV show data with type
  if (Array.isArray(tvShows) && tvShows.length > 0) {
    tvShows.forEach((e) => {
      updatedRecords.push({ ...e, type: "tv_show" });
    });
  }

  const totalRecords = updatedRecords.length;
  const totalMovies = updatedRecords.filter((e) => e.type == "movie").length;
  const totalTvShows = updatedRecords.filter((e) => e.type == "tv_show").length;

  console.log("Total records: ", totalRecords);
  console.log("Total movies: ", totalMovies);
  console.log("Total Tv-Shows: ", totalTvShows);

  try {
    const { status, inserted } = await mongoBulkInsert({
      db: "movies_database",
      model: mongo.Movie,
      data: updatedRecords,
      duplicationCheck: ["id", "type"],
    });

    if (status) {
      const collectionName = mongo.Movie.collection.name;
      const filePath = path.join(__dirname, "../movies-app/logs");
      const fileName = `INSERT-${collectionName}-${new Date()
        .toISOString()
        .replace(/[:.]/g, "-")}.txt`;
      await generateCsv(filePath, fileName, inserted);
      // await generateJson(filePath, fileName, inserted);
    }
  } catch (err) {
    console.error("Failed to insert media data:", err);
    throw err;
  }
};

module.exports = {
  insertMedia,
};
