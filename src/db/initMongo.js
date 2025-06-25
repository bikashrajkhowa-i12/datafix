const mongoose = require("mongoose");
const { connectMongoDB } = require("./dbConnection");

const initMongo = async (dbName, collectionName, schemaModel) => {
  try {
    // Connect directly to the target DB
    await connectMongoDB(dbName);
    await createCollection(collectionName, schemaModel);
  } catch (error) {
    console.error("❌ Error in initMongo:", error);
    throw error;
  } finally {
    await mongoose.disconnect();
  }
};

const createCollection = async (collectionName, schemaModel) => {
  try {
    const db = mongoose.connection.db;

    console.log(`\n🛠️ Creating collection: ${collectionName}\n`);

    if (schemaModel) {
      const model = new schemaModel({
        title: "_init_dummy",
        timeStamp: `${Date.now()}`,
      }); //
      await model.save();
      await model.deleteMany({ title: "_init_dummy" });
    } else {
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
