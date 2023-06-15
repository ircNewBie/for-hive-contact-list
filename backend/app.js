const express = require("express");
const app = express();
const db = require("./db/db-connect");
const PORT = 5000;

// Middleware
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("ContactList App v0.1");
});

async function startServer() {
  try {
    let mongooseInstance = await db.connectToDatabase();

    app.set("mongooseInstance", mongooseInstance);

    const server = app.listen(process.env.PORT || PORT, () => {
      const port = server.address().port;
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    db.closeDatabaseConnection();
  }
}

startServer();

module.exports = app;
