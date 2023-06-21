require("dotenv").config();

const userSeederRun = require("./seeders/user.seeder");

const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DBASE = process.env.MONGODB_DB;

const MONGO_CONN_STRING =
  process.env.MONGODB_URI_STAGING || MONGODB_URI + MONGODB_DBASE;

const runSeeders = async () => {
  try {
    await mongoose.connect(MONGO_CONN_STRING, {
      useNewUrlParser: true,
    });

    await userSeederRun();

    console.log("All seeders finished successfully.");
    mongoose.disconnect();
  } catch (error) {
    console.error("Error running seeders:", error);
    mongoose.disconnect();
    process.exit(1);
  }
};

runSeeders();
