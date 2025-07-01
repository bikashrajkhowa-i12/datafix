const initMongo = require("../db/initMongo");

const { insertMedia } = require("./insertData");
const genreMappingConfig = require("./genreMappingConfig");

const startJob = async () => {
  //! COMMENT out all other functions that don't need to run.
  // const dbName = "movies_database";
  // const collectionName = "configs";
  // const schemaModel = null;
  // await initMongo(dbName, collectionName, schemaModel);
  //await insertMedia();
  //await genreMappingConfig();
};

module.exports = startJob;
