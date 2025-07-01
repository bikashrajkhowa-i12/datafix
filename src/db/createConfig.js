const mongoose = require("mongoose");
const { connectMongoDB } = require("./dbConnection");

const createConfig = async (dbName, collectionName, configObj) => {
  try {
    await connectMongoDB(dbName); 
    const db = mongoose.connection.db;

    const collection = db.collection(collectionName);
    const existing = await collection.findOne({ name: configObj?.name });

    if (existing) {
      console.log(`Config with name "${configObj.name}" already exists.`);
      return;
    }

    const result = await collection.insertOne(configObj);

    if (result.acknowledged) {
      console.log("Config created successfully:", result.insertedId);
    } else {
      console.error("Insert failed!");
    }
  } catch (error) {
    console.error("Failed to create config!");
    console.error(error);
    throw error;
  }
};

module.exports = createConfig;
