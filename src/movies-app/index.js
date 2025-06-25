const initMongo = require("../db/initMongo");
const { insertMedia } = require("./insertData");

const startJob = async () => {
  //! COMMENT out all other functions that don't need to run.

  //await initMongo(dbName, collectionName, schemaModel);
  //await insertMedia();
};

module.exports = startJob;
