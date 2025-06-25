const mongoose = require("mongoose");

const connectMongoDB = async (database) => {
  try {
    const connectionString = database
      ? `${process.env.MONGODB_URI}/${database}`
      : process.env.MONGODB_URI;

    await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(
      `✅ MongoDB connected successfully!\nDatabase: ${
        database || "admin\n\n\n\n"
      }`
    );
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1);
  }
};

module.exports = {
  connectMongoDB,
};
