const { connectMongoDB } = require("./dbConnection");

const mongoBulkInsert = async ({ db, model, data, duplicationCheck }) => {
  try {
    if (!db || !model) throw new Error("Database and model are required!");

    if (!Array.isArray(data) || data.length === 0) {
      console.log("Nothing to insert.");
      return false;
    }

    await connectMongoDB(db);
    console.log("Checking for duplicates...");

    const processedKeys = new Set();
    const newRecords = [];
    const insertedIds = [];
    const duplicateIds = [];

    for (const record of data) {
      const filter = duplicationCheck.reduce((acc, key) => {
        acc[key] = record[key];
        return acc;
      }, {});

      const filterKey = JSON.stringify(filter); // Unique batch key

      if (processedKeys.has(filterKey)) {
        duplicateIds.push(record.id); // Duplicate within current batch
        continue;
      }

      const exists = await model.exists(filter);
      if (!exists) {
        newRecords.push(record);
        insertedIds.push(record.id);
        processedKeys.add(filterKey);
      } else {
        duplicateIds.push(record.id);
      }
    }

    if (newRecords.length === 0) {
      console.log(`All ${duplicateIds.length} records already exist.`);
      return {
        status: false,
        inserted: [],
        duplicates: duplicateIds,
      };
    }

    await model.insertMany(newRecords);

    console.log(`Inserted ${newRecords.length} new records.`);
    if (duplicateIds.length > 0) {
      console.log(`Skipped ${duplicateIds.length} duplicate records.`);
    }

    return {
      status: true,
      inserted: insertedIds,
      duplicates: duplicateIds,
    };
  } catch (error) {
    console.error("❌ Mongo insert failed:", error);
    return false;
  }
};

module.exports = {
  mongoBulkInsert,
};
