const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
require("dotenv").config();

let mongoServer;

async function setupTestDatabase() {
  mongoose.Promise = global.Promise;
  process.env.NODE_ENV = "test";

  // Set up the MongoMemoryServer instance
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri, { useNewUrlParser: true });
}

async function teardownTestDatabase() {
  await mongoose.disconnect();
  await mongoServer.stop();
}

async function clearTestDatabase() {
  const collections = mongoose.connection.collections;

  for (const key in collections) {
    await collections[key].deleteMany();
  }
}

module.exports = {
  setupTestDatabase,
  teardownTestDatabase,
  clearTestDatabase,
};
