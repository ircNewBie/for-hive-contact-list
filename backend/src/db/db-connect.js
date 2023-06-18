const mongoose = require("mongoose");
require("dotenv").config();

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DBASE = process.env.MONGODB_DB;

const MONGO_CONN_STRING =
  process.env.MONGODB_URI_STAGING || MONGODB_URI + MONGODB_DBASE;

const connectToDatabase = async () => {
  try {
    const mongooseInstance = await mongoose.connect(MONGO_CONN_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB successfully!");
    console.log(
      `Backend database is running at:  ${
        process.env.MONGODB_URI_STAGING ? "Cloud (MongoDB Atlas)" : "Localhost"
      }`
    );
    return mongooseInstance;
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1); // Exit the application if connection fails
  }
};

const closeDatabaseConnection = async () => {
  if (mongoose.connection.readyState === 1) {
    try {
      await mongoose.connection.close();
      console.log("Disconnected from MongoDB.");
      process.exit(0); // Exit the application after closing the connection
    } catch (error) {
      console.error("Failed to close MongoDB connection:", error);
    }
  }
};

module.exports = {
  connectToDatabase,
  closeDatabaseConnection,
};
