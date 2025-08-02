require("dotenv").config();
const { disconnectMongo } = require("./src/db/dbDisconnect");
// const startJob = require("./src/movies-app/index");
const startJob = require("./src/blogs/football-blog/index");

const main = async () => {
  console.log("Job started...");
  let exitCode = 0;

  try {
    await startJob();
    console.log("Job ended!");
  } catch (err) {
    console.error("Job failed:", err);
    exitCode = 1;
  } finally {
    await disconnectMongo();
    process.exit(exitCode);
  }
};

main();
