const mongoose = require("mongoose");

const disconnectMongo = async () => {
  try {
    console.log("Disconnecting mongoDb ...");
    await mongoose.disconnect();
    console.log("MongoDb disconnected.");
  } catch (error) {
    console.error("Error disconnecting mongoDb:", error);
  }
};

module.exports = { disconnectMongo };
