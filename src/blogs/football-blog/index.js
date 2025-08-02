const { footballBlogSchema } =
  require("@bikashrajkhowa-i12/blackboxcore").Mongo;

const { connectMongoDB } = require("../../db/dbConnection");
const initMongo = require("../../db/initMongo");
const { insertBlog } = require("./insertBlog");

const startJob = async () => {
  //! COMMENT out all other functions that don't need to run.
  // const dbName = "blogs";
  // const collectionName = "football_blogs";
  // const schema = footballBlogSchema;
  // await initMongo(dbName, collectionName, schema); // use this if you need mongo connection + create db + collection all at once
  // const conn = await connectMongoDB(dbName); // it connects to db and returns the connection details
  // await insertBlog(conn, collectionName, schema);
};

module.exports = startJob;
