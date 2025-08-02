const mongoose = require("mongoose");
const { connectMongoDB } = require("./dbConnection");

const createConfig = async (dbName, collectionName, configObj) => {
  try {
    if (!configObj?.name) {
      throw new Error("Config object must include a 'name' field.");
    }

    const conn = await connectMongoDB(dbName);
    const db = conn.db;

    // Check if collection exists
    const collections = await db
      .listCollections({ name: collectionName })
      .toArray();

    if (collections.length === 0) {
      console.warn(
        `Collection "${collectionName}" does not exist. Creating it...`
      );
      await db.createCollection(collectionName);
    }

    const collection = db.collection(collectionName);

    // Optional: Ensure index on `name` field for faster duplicate checks
    await collection.createIndex({ name: 1 }, { unique: true });

    const existing = await collection.findOne({ name: configObj.name });

    if (existing) {
      console.log(`Config with name "${configObj.name}" already exists.`);
      return { status: false, reason: "Duplicate" };
    }

    const result = await collection.insertOne(configObj);

    if (result.acknowledged) {
      console.log("✅ Config created successfully:", result.insertedId);
      return { status: true, id: result.insertedId };
    } else {
      console.error("❌ Insert failed!");
      return { status: false, reason: "Insert failed" };
    }
  } catch (error) {
    console.error("❌ Failed to create config!");
    console.error(error);
    return { status: false, reason: error.message };
  }
};

module.exports = createConfig;
