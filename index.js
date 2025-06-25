require("dotenv").config();

const startJob = require("./src/movies-app/index");

async function main() {
  console.log("Job started...");

  await startJob();

  console.log("Job ended!");
  process.exit(0);
}

main().catch((err) => {
  console.error("Job failed:", err);
  process.exit(1);
});
