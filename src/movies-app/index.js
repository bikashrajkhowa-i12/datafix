const { movieSchema } = require("@bikashrajkhowa-i12/blackboxcore").Mongo;

const initMongo = require("../db/initMongo");

const { insertMedia } = require("./insertData");
const genreMappingConfig = require("./genreMappingConfig");
const { connectMongoDB } = require("../db/dbConnection");

const startJob = async () => {
  //! COMMENT out all other functions that don't need to run.
  // const dbName = "movies_database";
  // const collectionName = "movies";
  // const schema = movieSchema;
  // await initMongo(dbName, collectionName, schemaModel); // use it for all at once -> connection + create db(dummy) + create collection (dummy)
  // const conn = await connectMongoDB(dbName);
  // await insertMedia(conn, collectionName, schema);
  // await genreMappingConfig();
};

module.exports = startJob;
