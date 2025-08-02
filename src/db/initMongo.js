const mongoose = require("mongoose");
const { connectMongoDB } = require("./dbConnection");

const initMongo = async (dbName, collectionName, schema) => {
  try {
    // Connect directly to the target DB
    const conn = await connectMongoDB(dbName);
    await createCollection(conn, collectionName, schema);
  } catch (error) {
    console.error("❌ Error in initMongo:", error);
    throw error;
  } finally {
    await mongoose.disconnect();
  }
};

const createCollection = async (conn, collectionName, schema) => {
  try {
    console.log(`\n🛠️ Creating collection: ${collectionName}\n`);

    if (schema) {
      const TempModel =
        conn.models[collectionName] ||
        conn.model(collectionName, schema, collectionName);

      const dummy = new TempModel({
        title: "_init_dummy",
        timeStamp: Date.now(),
      });

      await dummy.save();
      await TempModel.deleteMany({ title: "_init_dummy" });
    } else {
      const db = conn.db;
      const collection = db.collection(collectionName);
      await collection.insertOne({ title: "_init_dummy" });
      await collection.deleteOne({ title: "_init_dummy" });
    }

    console.log("✅ Collection created successfully\n");
  } catch (error) {
    console.error("❌ Error in createCollection:", error);
  }
};

module.exports = initMongo;
