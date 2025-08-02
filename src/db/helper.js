const mongoInsert = async ({
  conn,
  collection,
  schema,
  data,
  duplicationCheck,
}) => {
  try {
    let model;

    if (!data || typeof data !== "object") {
      console.log("Invalid or empty data.");
      return {
        status: false,
        inserted: null,
        duplicate: null,
        reason: "No valid data object provided.",
      };
    }

    console.log("Checking for duplicate...");

    const filter = Array.isArray(duplicationCheck)
      ? duplicationCheck.reduce((acc, key) => {
          acc[key] = data[key];
          return acc;
        }, {})
      : {};

    if (schema) {
      model =
        conn.models[collection] || conn.model(collection, schema, collection);

      const exists = await model.exists(filter);

      if (exists) {
        console.log("Duplicate found. Skipping insert.");
        return {
          status: false,
          inserted: null,
          duplicate: data.id || null,
          reason: "Duplicate entry found in DB.",
        };
      }

      const inserted = await model.create(data);
      console.log("Record inserted successfully!!");

      return {
        status: true,
        inserted: inserted._id || inserted.id,
        duplicate: null,
      };
    } else {
      const dbCollection = conn.db.collection(collection);

      const exists = await dbCollection.findOne(filter);
      if (exists) {
        console.log("Duplicate found. Skipping insert.");
        return {
          status: false,
          inserted: null,
          duplicate: data._id || data.id || null,
          reason: "Duplicate entry found in DB.",
        };
      }
      const updatedData = {
        ...data,
        ["remarks"]: [
          "Missing schema",
          "Inserted raw input, please check for missing fields",
        ],
      };
      const inserted = await dbCollection.insertOne(updatedData);
      console.log("Record inserted successfully!!");

      return {
        status: true,
        inserted: inserted.insertedId,
        duplicate: null,
      };
    }
  } catch (error) {
    console.error("Mongo single insert failed:", error);
    return {
      status: false,
      inserted: null,
      duplicate: null,
      reason: error.message || "Unknown error",
    };
  }
};

const mongoBulkInsert = async ({
  conn,
  collection,
  schema,
  data,
  duplicationCheck,
}) => {
  try {
    if (!conn || !collection) {
      throw new Error("Database connection and collection name are required.");
    }

    if (!Array.isArray(data) || data.length === 0) {
      console.log("No valid data to insert.");
      return {
        status: false,
        inserted: [],
        duplicates: [],
        reason: "Data array is empty or invalid.",
      };
    }

    console.log("Checking for duplicates...");

    let model;
    const insertedIds = [];
    const duplicateIds = [];

    if (schema) {
      model =
        conn.models[collection] || conn.model(collection, schema, collection);

      const processedKeys = new Set();
      const recordsToInsert = [];

      for (const record of data) {
        const filter = Array.isArray(duplicationCheck)
          ? duplicationCheck.reduce((acc, key) => {
              acc[key] = record[key];
              return acc;
            }, {})
          : {};

        const filterKey = JSON.stringify(filter);

        if (processedKeys.has(filterKey)) {
          duplicateIds.push(record.id || null); // duplicate in batch
          continue;
        }

        const exists = await model.exists(filter);
        if (!exists) {
          recordsToInsert.push(record);
          insertedIds.push(record.id || null);
          processedKeys.add(filterKey);
        } else {
          duplicateIds.push(record.id || null);
        }
      }

      if (recordsToInsert.length === 0) {
        console.log(`All ${duplicateIds.length} records already exist.`);
        return {
          status: false,
          inserted: [],
          duplicates: duplicateIds,
          reason: "No new unique records found.",
        };
      }

      await model.insertMany(recordsToInsert, { ordered: false });
      console.log(`Inserted ${recordsToInsert.length} new records.`);

      return {
        status: true,
        inserted: insertedIds,
        duplicates: duplicateIds,
      };
    } else {
      const dbCollection = conn.db.collection(collection);
      const recordsToInsert = [];
      const processedKeys = new Set();

      for (const record of data) {
        const filter = duplicationCheck.reduce((acc, key) => {
          acc[key] = record[key];
          return acc;
        }, {});

        const filterKey = JSON.stringify(filter);

        if (processedKeys.has(filterKey)) {
          duplicateIds.push(record.id || null); // duplicate in batch
          continue;
        }

        const exists = await dbCollection.findOne(filter);
        if (!exists) {
          recordsToInsert.push({
            ...record,
            remarks: [
              "Missing schema",
              "Inserted raw input, please check for missing fields",
            ],
          });
          insertedIds.push(record.id || null);
          processedKeys.add(filterKey);
        } else {
          duplicateIds.push(record.id || null);
        }
      }

      if (recordsToInsert.length === 0) {
        console.log(`All ${duplicateIds.length} records already exist.`);
        return {
          status: false,
          inserted: [],
          duplicates: duplicateIds,
          reason: "No new unique records found.",
        };
      }

      await dbCollection.insertMany(recordsToInsert, { ordered: false });
      console.log(`Inserted ${recordsToInsert.length} new records.`);

      return {
        status: true,
        inserted: insertedIds,
        duplicates: duplicateIds,
      };
    }
  } catch (error) {
    console.error("Mongo bulk insert failed:", error);
    return {
      status: false,
      inserted: [],
      duplicates: [],
      reason: error.message || "Unknown error",
    };
  }
};

module.exports = {
  mongoInsert,
  mongoBulkInsert,
};
